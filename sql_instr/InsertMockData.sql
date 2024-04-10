-- Users
INSERT INTO Users (Email, FirstName, LastName, DOB, Password)
VALUES
('david@outlook.com', 'David', 'Hasslehof', '1998-10-01', 'hasslehoffing'),
('john@gmail.com', 'John', 'Doe', '2004-12-14', 'johnny13'),
('sophie@yahoo.com', 'Sophia', 'Doer', '2005-02-23', 'qwerty');

-- -- Buyers
-- INSERT INTO Buyers (BuyerID)
-- SELECT UserID FROM Users WHERE Email = 'john@gmail.com'
-- UNION ALL
-- SELECT UserID FROM Users WHERE Email = 'sophie@yahoo.com';
-- UNION ALL


-- Sellers
INSERT INTO Sellers (SellerID)
SELECT UserID FROM Users WHERE Email = 'john@gmail.com'
UNION ALL
SELECT UserID FROM Users WHERE Email = 'david@outlook.com';

-- Shops
INSERT INTO Shops (ShopName, EstablishDate, Description, Owner)
VALUES
('WareSoft', CURRENT_DATE,
'WareSoft is lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum.',
(SELECT SellerID FROM Sellers JOIN Users ON SellerID = UserID WHERE Email='john@gmail.com')),

('J-Tech', CURRENT_DATE,
'J-Tech is lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum.',
(SELECT SellerID FROM Sellers JOIN Users ON SellerID = UserID WHERE Email='john@gmail.com')),

('HassleWare', CURRENT_DATE,
'HassleWare is lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum.',
(SELECT SellerID FROM Sellers JOIN Users ON SellerID = UserID WHERE Email='david@outlook.com'));

--Products
INSERT INTO Products (ShopID, Price, Name, Quantity, Description)
VALUES
((SELECT ShopID FROM Shops WHERE ShopID = 'fc9402d0-1247-49dc-8fe5-9a7a15baad41'), 10.99, 'Product0', 5, 'This is product 1. Lorem ipsum dolore elore'),
((SELECT ShopID FROM Shops WHERE ShopID = '4d7bb0e2-a733-4e1c-a793-cb91f5d09da6'), 10.99, 'Product1', 5, 'This is product 1. Lorem ipsum dolore'),
((SELECT ShopID FROM Shops WHERE ShopID = '4d7bb0e2-a733-4e1c-a793-cb91f5d09da6'), 20.99, 'Product2', 10, 'This is product 2. Lorem ipsum dolore 2'),
((SELECT ShopID FROM Shops WHERE ShopID = '4d7bb0e2-a733-4e1c-a793-cb91f5d09da6'), 11.99, 'Product3', 5, 'This is product 3. Lorem ipsum dolore 3'),
((SELECT ShopID FROM Shops WHERE ShopID = '4d7bb0e2-a733-4e1c-a793-cb91f5d09da6'), 21.99, 'Product4', 11, 'This is product 4. Lorem ipsum dolore 4'),
((SELECT ShopID FROM Shops WHERE ShopID = '4d7bb0e2-a733-4e1c-a793-cb91f5d09da6'), 10.49, 'Product5', 20, 'This is product 5. Lorem ipsum dolore 5'),
((SELECT ShopID FROM Shops WHERE ShopID = '4d7bb0e2-a733-4e1c-a793-cb91f5d09da6'), 23.99, 'Product6', 10, 'This is product 6. Lorem ipsum dolore 6'),
((SELECT ShopID FROM Shops WHERE ShopID = '4d7bb0e2-a733-4e1c-a793-cb91f5d09da6'), 11.99, 'Product7', 51, 'This is product 7. Lorem ipsum dolore 7'),
((SELECT ShopID FROM Shops WHERE ShopID = '4d7bb0e2-a733-4e1c-a793-cb91f5d09da6'), 255.99, 'Product8', 5, 'This is product 8. Lorem ipsum dolore 8'),
((SELECT ShopID FROM Shops WHERE ShopID = '4d7bb0e2-a733-4e1c-a793-cb91f5d09da6'), 10.99, 'Product9', 8, 'This is product 9. Lorem ipsum dolore 9'),
((SELECT ShopID FROM Shops WHERE ShopID = '4d7bb0e2-a733-4e1c-a793-cb91f5d09da6'), 20.99, 'Product10', 10, 'This is product 10. Lorem ipsum dolore 10');

