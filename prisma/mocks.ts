import {
  type Amount,
  type PrismaClient,
  type RequestSource,
  Prisma,
} from "@prisma/client";
import dayjs from "dayjs";

// The maximum is inclusive and the minimum is inclusive
const getRandomIntInclusive = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const pickRandom = <TData>(array: TData[]) => {
  const randomIndex = Math.floor(Math.random() * array.length) || 0;

  return array[randomIndex] as TData;
};

export const users: Prisma.UserCreateInput[] = [
  {
    name: "Han Solo",
    email: "han_solo@abv.bg",
    bearerToken: "3MCSzinXV9tPZ4Ls%EY!",
    image:
      "https://i.pinimg.com/564x/6e/52/b6/6e52b6caef4246ab9d8d652d35cbb163.jpg",
  },
  {
    name: "Dart Vader",
    email: "vader@abv.bg",
    bearerToken: "#Pr$wt*tF!B8nRVGz8bs%EY!",
    image:
      "https://as2.ftcdn.net/v2/jpg/02/98/94/25/1000_F_298942592_iSd9VSoiLOii6wFLb7mPSMKXpWS7RZIz.jpg",
  },
  {
    name: "Andrey",
    email: "andrei_t@abv.bg",
    bearerToken: "jyl6cvq*XtYy&Oq9SofX",
    image:
      "https://lh3.googleusercontent.com/a/AGNmyxZDSaxRivvFbMMq9IpMqhAKxP2Ibew0dC2XHKWODcI=s288",
  },
];

const sourceOptions: RequestSource[] = ["Shortcut", "Web", "Postman"];
const amountOptions: Amount[] = ["Small", "Medium", "Large"];

export const userDefaultSelect = Prisma.validator<Prisma.UserSelect>()({
  name: true,
  id: true,
});

export const userShortData = Prisma.validator<Prisma.UserArgs>()({
  select: userDefaultSelect,
});

type UserShort = Prisma.UserGetPayload<typeof userShortData>;

export const insertIntakeEntries = async (
  user: UserShort,
  daysBehind: number,
  prisma: PrismaClient
) => {
  for (let dayIndex = 1; dayIndex < daysBehind + 1; dayIndex++) {
    const today = dayjs();
    const numberOfMeals = getRandomIntInclusive(1, 5);

    for (let index = 0; index < numberOfMeals; index++) {
      const randomRequest = pickRandom<RequestSource>(sourceOptions);
      const date = today
        .subtract(dayIndex, "day")
        .set("hour", getRandomIntInclusive(11, 21))
        .set("minute", getRandomIntInclusive(1, 59));

      await prisma.intakeEntry.create({
        data: {
          intakeAt: date.format(),
          description: `${user.name ?? ""}'s intakes`,
          requestSource: randomRequest ?? sourceOptions[0],
          amount: pickRandom<Amount>(amountOptions),
          owner: { connect: { id: user.id } },
        },
      });
    }
  }
};
