const adminResolver = {
  Query: {
    AllAdmins: async (_, __, context) =>
      context.Admin.find({})
        .lean()
        .exec()
        .catch(error => new Error(error, `ERROR QUERY ALL Admin`)),
    AdminById: async (_, adminArgs, context) => {
      const { id } = adminArgs;
      const foundAdmin = await context.Admin.findOne({ id })
        .lean()
        .exec()
        .catch(error => new Error(error, `ERROR QUERY ALL Admin`));
      return foundAdmin;
    },
  },
};
export default adminResolver;
