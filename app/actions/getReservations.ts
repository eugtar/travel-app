import prisma from "@/app/libs/prismadb";

const getReservations = async (params: {
  listingId?: string;
  userId?: string;
  authorId?: string;
}) => {
  try {
    const { listingId, userId, authorId } = params;
    const query: any = {};
    if (listingId) query.listingId = listingId;
    if (authorId) query.listing = { userId: authorId };
    if (userId) query.userId = userId;

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getReservations;
