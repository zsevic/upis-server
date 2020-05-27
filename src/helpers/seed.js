import models from '../models';

export const createUsersWithFaculties = async (date) => {
  await models.User.create(
    {
      username: 'user1',
      email: 'user1@users.com',
      password: 'userresu',
      role: 'ADMIN',
      faculty: {
        name: 'Faculty of Mathematics',
        counter: 1,
        createdAt: date.setSeconds(date.getSeconds() + 1),
        departments: [
          {
            name: 'Mathematics',
            total: 250,
            budget: 205,
            selfFinancing: 45,
          },
          {
            name: 'Computer science',
            total: 160,
            budget: 105,
            selfFinancing: 55,
          },
          {
            name: 'Astronomy and astrophysics',
            total: 25,
            budget: 20,
            selfFinancing: 5,
          },
        ],
      },
    },
    {
      include: [
        {
          model: models.Faculty,
          as: 'faculty',
          include: [
            {
              model: models.Department,
              as: 'departments',
            },
          ],
        },
      ],
    },
  );

  await models.User.create(
    {
      username: 'user2',
      email: 'user2@users.com',
      password: 'userresu',
      role: 'user',
      faculty: {
        name: 'School of Electrical Engineering',
        counter: 1,
        createdAt: date.setSeconds(date.getSeconds() + 1),
        departments: [
          {
            name: 'Electrical engineering and computer science',
            total: 500,
            budget: 400,
            selfFinancing: 100,
          },
          {
            name: 'Software engineering',
            total: 175,
            budget: 30,
            selfFinancing: 145,
          },
        ],
      },
    },
    {
      include: [
        {
          model: models.Faculty,
          as: 'faculty',
          include: [{ model: models.Department, as: 'departments' }],
        },
      ],
    },
  );

  await models.User.create(
    {
      username: 'user3',
      email: 'user3@users.com',
      password: 'userresu',
      role: 'ADMIN',
      faculty: {
        name: 'Faculty of Organizational Sciences',
        counter: 1,
        createdAt: date.setSeconds(date.getSeconds() + 1),
        departments: [
          {
            name: 'Information systems and technology',
            total: 390,
            budget: 190,
            selfFinancing: 200,
          },
          {
            name: 'Management and organization',
            total: 330,
            budget: 190,
            selfFinancing: 140,
          },
          {
            name: 'Information systems and technology - distance studies',
            total: 100,
            budget: 5,
            selfFinancing: 95,
          },
        ],
      },
    },
    {
      include: [
        {
          model: models.Faculty,
          as: 'faculty',
          include: [
            {
              model: models.Department,
              as: 'departments',
            },
          ],
        },
      ],
    },
  );
};
