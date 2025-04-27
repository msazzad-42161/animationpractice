import { faker } from "@faker-js/faker";

faker.seed(12);
const data = [...Array(100)].map(() => ({
    key: faker.string.uuid(),
    title: faker.music.artist(),
    image: faker.image.urlLoremFlickr({
        category: "nature",
        width: 300,
        height: 300 * 1.4,
    }),
    bg: faker.color.rgb(),
    description: faker.lorem.sentences({ min: 1, max: 3 }),
    author: {
        name: faker.person.fullName(),
        avatar: faker.image.avatarGitHub(),
    }
}));

export default data;