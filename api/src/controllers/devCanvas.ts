// export const getUser = async (email: String) => {
//     client.setHeader("x-api-key", apiKey);
//     return await makeGraphQLRequest(getUserQuery, { email });
//   };

import { BigPromise } from "../middlewares";
import { Project, User } from "../mongo/schemas";

//   export const createUser = async (newUser: CreateUserInput) => {
//     client.setHeader("x-api-key", apiKey);
//     return await makeGraphQLRequest(createUserMutation, { input: newUser });
//   };

//   export const createNewProject = async ({
//     form,
//     creatorId,
//     token,
//   }: {
//     form: ProjectFormInput;
//     creatorId: string;
//     token: string;
//   }) => {
//     const imageObj = await uploadImage(form.image);

//     if (imageObj) {
//       client.setHeader("Authorization", `Bearer ${token}`);
//       const variables = {
//         input: {
//           ...form,
//           image: imageObj.url,
//           createdBy: {
//             link: creatorId,
//           },
//         },
//       };
//       return await makeGraphQLRequest(createProjectMutation, variables);
//     }
//   };

//   export const fetchAllProjects = async ({
//     category,
//     endCursor,
//   }: {
//     category?: string;
//     endCursor?: string;
//   }) => {
//     client.setHeader("x-api-key", apiKey);
//     const query = category ? getProjectsByCategoryQuery : getProjectsQuery;
//     const variables = {
//       category,
//       endCursor
//     };
//     return await makeGraphQLRequest(query, variables);
//   };

//   export const getProjectDetails = async (id: string) => {
//     client.setHeader("x-api-key", apiKey);
//     return await makeGraphQLRequest(getProjectByIdQuery, { id });
//   };
//   export const getUserProjects = async (id: string, last?: number) => {
//     client.setHeader("x-api-key", apiKey);
//     return await makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
//   };
//   export const deleteUserProject = async ({
//     id,
//     token,
//   }: {
//     id: string;
//     token: string;
//   }) => {
//     client.setHeader("Authorization", `Bearer ${token}`);
//     return await makeGraphQLRequest(deleteProjectMutation, { id });
//   };
//   export const editUserProject = async ({
//     id,
//     token,
//     form,
//   }: {
//     id: string;
//     token: string;
//     form: ProjectFormInput;
//   }) => {
//     let updatedForm = { ...form };

//     const isUploadingNewImage = isBase64DataURL(form.image);
//     if (isUploadingNewImage) {
//       const imageObj = await uploadImage(form.image);
//       if (imageObj) {
//         updatedForm.image = imageObj.url;
//       }
//     }

//     const variables = {
//       id,
//       input: updatedForm,
//     };
//     client.setHeader("Authorization", `Bearer ${token}`);
//     return await makeGraphQLRequest(updateProjectMutation, variables);
//   };

// const User = g
//   .model("User", {
//     name: g.string().length({ min: 2, max: 100 }),
//     email: g.string().unique(),
//     avatarUrl: g.url(),
//     description: g.string().length({ min: 2, max: 1000 }).optional(),
//     githubUrl: g.url().optional(),
//     linkedinUrl: g.url().optional(),
//     projects: g
//       .relation(() => Project)
//       .list()
//       .optional(),
//   })
//   .auth((rules) => {
//     rules.public().read();
//   });

// // @ts-ignore
// const Project = g
//   .model("Project", {
//     title: g.string().length({ min: 3 }),
//     description: g.string(),
//     image: g.url(),
//     liveSiteUrl: g.url(),
//     githubUrl: g.url(),
//     category: g.string().search(),
//     createdBy: g.relation(() => User),
//   })
//   .auth((rules) => {
//     rules.public().read();
//     rules.private().create().delete().update();
//   });

// import mongoose

// create user function
export const createUser = BigPromise(async (req, res, next) => {
  const { name, email, avatarUrl, description, githubUrl, linkedinUrl } =
    req.body;
  const user = new User({
    name,
    email,
    avatarUrl,
    description,
    githubUrl,
    linkedinUrl,
  });
  await user.save();
  res.status(201).json(user);
});

// create project function
export const createProject = BigPromise(async (req, res, next) => {
  const {
    title,
    description,
    image,
    liveSiteUrl,
    githubUrl,
    category,
    createdBy,
  } = req.body;
  // find user by email

  const user = await User.findOne({
    email: createdBy,
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  const project = new Project({
    title,
    description,
    image,
    liveSiteUrl,
    githubUrl,
    category,
    createdBy: user._id,
  });
  await project.save();
  await User.findByIdAndUpdate(
    user._id,
    {
      $push: { projects: project._id },
    },
    { new: true }
  );
  res.status(201).json(project);
});

// fetch all projects function
export const fetchAllProjects = BigPromise(async (req, res, next) => {
  const projects = await Project.find().populate("createdBy");
  res.status(200).json(projects);
});

// fetch project details function
export const getProjectDetails = BigPromise(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id).populate("createdBy");
  res.status(200).json(project);
});

// fetch user projects function
export const getUserProjects = BigPromise(async (req, res, next) => {
  const { id } = req.params;
  const projects = await Project.find({ createdBy: id }).populate("createdBy");
  res.status(200).json(projects);
});

// delete user project function
export const deleteUserProject = BigPromise(async (req, res, next) => {
  const { id } = req.params;
  await Project.findByIdAndDelete(id);
  res.status(204).json();
});

// edit user project function
export const editUserProject = BigPromise(async (req, res, next) => {
  const { id } = req.params;
  const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(updatedProject);
});

export const getUser = BigPromise(async (req, res, next) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  res.status(200).json(user);
});
