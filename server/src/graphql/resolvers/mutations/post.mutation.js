module.exports = {
    createPost: async (parent, args, { prisma }, info) => {
        return await prisma.mutation.createPost({
            data: {
                ...args.data
            }
        }, info);
    },
};