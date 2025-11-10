// backend/src/adapters/outbound/postgres/PoolRepoPrisma.ts
import { prisma } from "./PrismaClient";
import type { PoolRepo } from "../../../core/ports/PoolRepo";
import type { PoolInput } from "../../../core/domain/Pool";
import type { PoolMember as PoolMemberModel } from "@prisma/client"; // <-- add this

export const PoolRepoPrisma: PoolRepo = {
  async create(input: PoolInput) {
    const pool = await prisma.pool.create({ data: { year: input.year } });

    const createdMembers: PoolMemberModel[] = await prisma.$transaction(      // <-- typed
      input.members.map((m) =>
        prisma.poolMember.create({
          data: {
            poolId: pool.id,
            shipId: m.shipId,
            cbBefore: m.cbBefore,
            cbAfter: m.cbAfter ?? m.cbBefore,
          },
        })
      )
    );

    return {
      poolId: pool.id,
      members: createdMembers.map((m) => ({        // m is typed
        shipId: m.shipId,
        cbBefore: m.cbBefore,
        cbAfter: m.cbAfter,
      })),
    };
  },
};
