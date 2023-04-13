export {};
// /* eslint-disable react/jsx-filename-extension */
// import { LineChartOutlined, TeamOutlined } from '@ant-design/icons';
// import roles from '../constants/roles';

// /**
//  * function that return array of allowed roles for navigational items.
//  * @param {array} roles The roles to be added to [roles.ADMIN, roles.SUPER_ADMIN]. If nothing provided, returns all
//  * @param {bool} strict If true, return exclusively the roles in the roles list
//  * @returns array
//  */
// export const addRoles = (addedRoles = ['all'], strict = null) => {
//   if (strict) {
//     return addedRoles;
//   }

//   return addedRoles[0] === 'all' ? ['all'] : [...addedRoles, roles.ADMIN];
// };

// export const navigationItemsBase = [
//   {
//     title: 'Groups',
//     link: null,
//     icon: <LineChartOutlined />,
//     roles: addRoles([roles.USER]),
//     submenus: [
//       {
//         title: 'All Groups',
//         link: '/groups',
//         roles: addRoles([roles.USER]),
//       },
//       {
//         title: 'Create',
//         link: '/groups/add',
//         roles: addRoles([roles.USER]),
//       },
//     ],
//   },
//   {
//     title: 'Parties',
//     link: null,
//     icon: <LineChartOutlined />,
//     roles: addRoles([roles.USER]),
//     submenus: [
//       {
//         title: 'All Parties',
//         link: '/parties',
//         roles: addRoles([roles.USER]),
//       },
//       {
//         title: 'Create',
//         link: '/parties/add',
//         roles: addRoles([roles.USER]),
//       },
//     ],
//   },
//   {
//     title: 'Participants',
//     link: null,
//     icon: <TeamOutlined />,
//     roles: addRoles(),
//     submenus: [
//       {
//         title: 'All Participants',
//         link: '/participants',
//         roles: addRoles(),
//       },
//       {
//         title: 'Create',
//         link: '/participants/add',
//         roles: addRoles(),
//       },
//     ],
//   },
// ];
// /**
//  *
//  * @param {object} user The user with their role
//  * @param {array} navigationItems
//  * @param {string} path The current url
//  * @returns
//  */
// export const navigationBuilder = (user, navigationItems, path) => {
//   const userRole = user.role;

//   let defaultSelectedKeys = null;
//   let defaultOpenKeys = null;
//   const filteredNavigationItems = [];
//   navigationItems.forEach((item, itemIndex) => {
//     if (item.roles.includes(userRole) || item.roles[0] === 'all') {
//       const filteredSubmenus = item.submenus.filter((submenu, submenuIndex) => {
//         if (submenu.link?.includes(path) && path.includes(submenu.link)) {
//           defaultSelectedKeys = `${itemIndex}-${submenuIndex}-${submenu.title}`;
//           defaultOpenKeys = `${itemIndex}-${item.title}`;
//         }
//         if (submenu.roles.includes(userRole) || submenu.roles[0] === 'all') {
//           return true;
//         }
//         return false;
//       });

//       item.submenus = filteredSubmenus;
//       filteredNavigationItems.push(item);
//     }
//   });

//   return { filteredNavigationItems, defaultSelectedKeys, defaultOpenKeys };
// };
