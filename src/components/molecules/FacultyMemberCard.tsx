import Image from "next/image";
import { ExternalLink, GraduationCap } from "lucide-react";
import { Heading } from "@/components/atoms/Heading";
import { SurfaceCard } from "@/components/molecules/SurfaceCard";
import { buttonVariants } from "@/components/ui/button";
import type { FacultyMember } from "@/lib/types";
import { cn } from "@/lib/utils";

function facultyInitials(name: string): string {
  const cleaned = name.replace(/^دکتر\s+/, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "؟";
  if (parts.length === 1) return parts[0]!.slice(0, 2);
  return `${parts[0]!.slice(0, 1)}${parts[parts.length - 1]!.slice(0, 1)}`;
}

function hasPhoto(imageUrl: string): boolean {
  return Boolean(imageUrl) && /\.(jpe?g|png|webp)$/i.test(imageUrl);
}

export function FacultyMemberCard({ member }: { member: FacultyMember }) {
  const photo = hasPhoto(member.imageUrl);

  return (
    <SurfaceCard className="group flex h-full flex-col rounded-2xl">
      <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl bg-muted">
        {photo ? (
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-chart-3 to-primary/80 text-4xl font-semibold text-primary-foreground"
            aria-hidden
          >
            {facultyInitials(member.name)}
          </div>
        )}
      </div>

      <Heading as="h2" level={4}>
        {member.name}
      </Heading>

      <p className="mt-2 text-sm leading-7 text-muted-foreground">{member.focus}</p>

      {(member.linkedinUrl || member.scholarUrl) && (
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {member.linkedinUrl ? (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              <ExternalLink className="size-4" aria-hidden />
              لینکدین
            </a>
          ) : null}
          {member.scholarUrl ? (
            <a
              href={member.scholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              <GraduationCap className="size-4" aria-hidden />
              گوگل اسکولار
            </a>
          ) : null}
        </div>
      )}
    </SurfaceCard>
  );
}
