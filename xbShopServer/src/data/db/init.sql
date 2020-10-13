CREATE SCHEMA `xbshop` DEFAULT CHARACTER SET utf8;

insert into `c_useraccess` (`idUserAccess`, `code`) values (1, 'teamList'), (2, 'productList'), (3, 'category'), (4, 'userList');

INSERT INTO `a_userrole` (`idRole`, `label`, `reserved`) VALUES
(1, 'superAdmin', 1);

INSERT INTO `l_roleaccess` (`roleId`, `accessId`) VALUES
(1, 1), (1, 2), (1, 3), (1, 4);

INSERT INTO `a_user` (`idUser`, `username`, `password`, `phoneNumber`, `email`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(1, 'paker1989', 'paker1989', '659657708', 'xubinqz@gmail.com', 0, '2020-08-19 00:00:00', '2020-08-19 00:00:00');

INSERT INTO `l_userpref` (`idUserPref`, `userroleId`, `userAccessId`, `userId`) VALUES
(1, 1, 1, 1);


