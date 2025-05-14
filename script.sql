USE [master]
GO
/****** Object:  Database [lostnfound]    Script Date: 5/12/2025 3:24:43 AM ******/
CREATE DATABASE [lostnfound]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'lostnfound', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\lostnfound.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'lostnfound_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\lostnfound_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [lostnfound] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [lostnfound].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [lostnfound] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [lostnfound] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [lostnfound] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [lostnfound] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [lostnfound] SET ARITHABORT OFF 
GO
ALTER DATABASE [lostnfound] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [lostnfound] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [lostnfound] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [lostnfound] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [lostnfound] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [lostnfound] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [lostnfound] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [lostnfound] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [lostnfound] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [lostnfound] SET  ENABLE_BROKER 
GO
ALTER DATABASE [lostnfound] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [lostnfound] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [lostnfound] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [lostnfound] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [lostnfound] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [lostnfound] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [lostnfound] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [lostnfound] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [lostnfound] SET  MULTI_USER 
GO
ALTER DATABASE [lostnfound] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [lostnfound] SET DB_CHAINING OFF 
GO
ALTER DATABASE [lostnfound] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [lostnfound] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [lostnfound] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [lostnfound] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [lostnfound] SET QUERY_STORE = ON
GO
ALTER DATABASE [lostnfound] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [lostnfound]
GO
/****** Object:  Table [dbo].[Items]    Script Date: 5/12/2025 3:24:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Items](
	[ItemID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [char](6) NOT NULL,
	[ItemName] [varchar](100) NOT NULL,
	[Description] [text] NULL,
	[DateReported] [date] NOT NULL,
	[Location] [varchar](255) NULL,
	[ImagePath] [varchar](255) NULL,
	[ItemType] [varchar](10) NULL,
	[Status] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ItemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 5/12/2025 3:24:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[user_id] [char](6) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[oauth_provider] [varchar](50) NULL,
	[oauth_id] [varchar](100) NULL,
	[password_hashed] [varchar](255) NULL,
	[first_name] [varchar](30) NOT NULL,
	[last_name] [varchar](30) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[phone_number] [varchar](15) NOT NULL,
	[profile_picture] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Items] ON 

INSERT [dbo].[Items] ([ItemID], [UserID], [ItemName], [Description], [DateReported], [Location], [ImagePath], [ItemType], [Status]) VALUES (1014, N'a4a010', N'Black Wallet', N'Leather wallet with cards inside', CAST(N'2025-05-01' AS Date), N'Main Library', N'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0', N'Lost', N'Pending')
INSERT [dbo].[Items] ([ItemID], [UserID], [ItemName], [Description], [DateReported], [Location], [ImagePath], [ItemType], [Status]) VALUES (1015, N'U00002', N'Umbrella', N'Black foldable umbrella', CAST(N'2025-05-03' AS Date), N'Cafeteria', N'https://images.unsplash.com/photo-1499678450342-29ebee16d1ab?q=80&w=1707&auto=format&fit=crop&ixlib=rb-4.1.0', N'Found', N'Claimed')
INSERT [dbo].[Items] ([ItemID], [UserID], [ItemName], [Description], [DateReported], [Location], [ImagePath], [ItemType], [Status]) VALUES (1016, N'a4a010', N'iPhone 13', N'White iPhone with pink cover', CAST(N'2025-05-06' AS Date), N'Parking Lot', N'https://images.unsplash.com/photo-1726574686436-5ef90358e032?q=80&w=1869&auto=format&fit=crop&ixlib=rb-4.1.0', N'Lost', N'Pending')
INSERT [dbo].[Items] ([ItemID], [UserID], [ItemName], [Description], [DateReported], [Location], [ImagePath], [ItemType], [Status]) VALUES (1017, N'U00001', N'Notebook', N'Red spiral notebook', CAST(N'2025-05-07' AS Date), N'Lecture Hall B', N'https://images.unsplash.com/photo-1612367980327-7454a7276aa7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0', N'Found', N'Returned')
INSERT [dbo].[Items] ([ItemID], [UserID], [ItemName], [Description], [DateReported], [Location], [ImagePath], [ItemType], [Status]) VALUES (1018, N'U00002', N'Silver Ring', N'Thin silver ring with small engraving', CAST(N'2025-05-08' AS Date), N'Student Center', N'https://images.unsplash.com/photo-1620968867360-5cda83d2bffd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0', N'Found', N'Pending')
INSERT [dbo].[Items] ([ItemID], [UserID], [ItemName], [Description], [DateReported], [Location], [ImagePath], [ItemType], [Status]) VALUES (1019, N'U00003', N'Gym Bag', N'Blue gym bag with water bottle inside', CAST(N'2025-05-09' AS Date), N'Athletics Building', N'https://images.unsplash.com/photo-1692506530242-c12d6c3ae2e2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0', N'Lost', N'Pending')
INSERT [dbo].[Items] ([ItemID], [UserID], [ItemName], [Description], [DateReported], [Location], [ImagePath], [ItemType], [Status]) VALUES (1020, N'U00001', N'Passport', N'US passport in a black cover', CAST(N'2025-05-10' AS Date), N'Airport Shuttle Stop', N'https://images.unsplash.com/photo-1454496406107-dc34337da8d6?q=80&w=1900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', N'Lost', N'Pending')
INSERT [dbo].[Items] ([ItemID], [UserID], [ItemName], [Description], [DateReported], [Location], [ImagePath], [ItemType], [Status]) VALUES (1021, N'U00002', N'Water Bottle', N'Green stainless steel bottle', CAST(N'2025-05-11' AS Date), N'Library Courtyard', N'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0', N'Found', N'Claimed')
INSERT [dbo].[Items] ([ItemID], [UserID], [ItemName], [Description], [DateReported], [Location], [ImagePath], [ItemType], [Status]) VALUES (1022, N'U00003', N'Wireless Earbuds', N'White earbuds in charging case', CAST(N'2025-05-12' AS Date), N'Cafeteria Table 5', N'https://images.unsplash.com/photo-1722448113450-f6860b7fbfe5?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0', N'Lost', N'Returned')
INSERT [dbo].[Items] ([ItemID], [UserID], [ItemName], [Description], [DateReported], [Location], [ImagePath], [ItemType], [Status]) VALUES (1023, N'U00001', N'Notebook Charger', N'MacBook charger, 60W', CAST(N'2025-05-13' AS Date), N'Computer Lab 3', N'https://images.unsplash.com/photo-1660945671777-6389d37d6ab4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0', N'Found', N'Pending')
INSERT [dbo].[Items] ([ItemID], [UserID], [ItemName], [Description], [DateReported], [Location], [ImagePath], [ItemType], [Status]) VALUES (1024, N'U00002', N'Black Scarf', N'Wool scarf with red stripes', CAST(N'2025-05-05' AS Date), N'Bus Station Platform', N'https://www.sweetpeas.co.za/cdn/shop/files/AC950106-AAB1-4993-A880-D9E8EC449421.jpg?v=1682421108', N'Lost', N'Pending')
INSERT [dbo].[Items] ([ItemID], [UserID], [ItemName], [Description], [DateReported], [Location], [ImagePath], [ItemType], [Status]) VALUES (1025, N'U00003', N'Sunglasses', N'Polarized aviator sunglasses', CAST(N'2025-05-04' AS Date), N'Campus Park Bench', N'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0', N'Found', N'Pending')
INSERT [dbo].[Items] ([ItemID], [UserID], [ItemName], [Description], [DateReported], [Location], [ImagePath], [ItemType], [Status]) VALUES (1026, N'U00001', N'Car Keys', N'Keyring with two house keys and a fob', CAST(N'2025-05-02' AS Date), N'Parking Garage', N'https://images.unsplash.com/photo-1533558701576-23c65e0272fb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0', N'Lost', N'Pending')
INSERT [dbo].[Items] ([ItemID], [UserID], [ItemName], [Description], [DateReported], [Location], [ImagePath], [ItemType], [Status]) VALUES (1027, N'U00002', N'Student ID Card', N'University ID card in plastic sleeve', CAST(N'2025-05-14' AS Date), N'Administration Office', N'https://graphicsfamily.com/wp-content/uploads/2020/11/Modern-Student-Id-Card-design-scaled.jpg', N'Found', N'Claimed')
INSERT [dbo].[Items] ([ItemID], [UserID], [ItemName], [Description], [DateReported], [Location], [ImagePath], [ItemType], [Status]) VALUES (1028, N'U00003', N'USB Drive', N'32GB SanDisk USB stick', CAST(N'2025-05-15' AS Date), N'Library Computer', N'https://images.unsplash.com/photo-1587145820098-23e484e69816?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0', N'Lost', N'Pending')
SET IDENTITY_INSERT [dbo].[Items] OFF
GO
INSERT [dbo].[users] ([user_id], [email], [oauth_provider], [oauth_id], [password_hashed], [first_name], [last_name], [country_code], [phone_number], [profile_picture]) VALUES (N'a4a010', N'zakwanalam07@gmail.com', N'Facebook', N'1789147075342100', NULL, N'Zakwan', N'Alam', N'+92', N'03312462258', N'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=122135073188406506&height=50&width=50&ext=1749577146&hash=AT9gOeniFlddor9_pMtWhRBq')
INSERT [dbo].[users] ([user_id], [email], [oauth_provider], [oauth_id], [password_hashed], [first_name], [last_name], [country_code], [phone_number], [profile_picture]) VALUES (N'U00001', N'alice@example.com', NULL, NULL, NULL, N'Alice', N'Smith', N'+1', N'1234567890', N'https://example.com/profiles/alice.jpg')
INSERT [dbo].[users] ([user_id], [email], [oauth_provider], [oauth_id], [password_hashed], [first_name], [last_name], [country_code], [phone_number], [profile_picture]) VALUES (N'U00002', N'bob@example.com', NULL, NULL, NULL, N'Bob', N'Johnson', N'+44', N'7896541230', N'https://example.com/profiles/bob.jpg')
INSERT [dbo].[users] ([user_id], [email], [oauth_provider], [oauth_id], [password_hashed], [first_name], [last_name], [country_code], [phone_number], [profile_picture]) VALUES (N'U00003', N'carol@example.com', NULL, NULL, NULL, N'Carol', N'White', N'+92', N'3345678901', N'https://example.com/profiles/carol.jpg')
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__users__AB6E6164A133BF1B]    Script Date: 5/12/2025 3:24:44 AM ******/
ALTER TABLE [dbo].[users] ADD UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD CHECK  (([ItemType]='Found' OR [ItemType]='Lost'))
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD CHECK  (([Status]='Returned' OR [Status]='Claimed' OR [Status]='Pending'))
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [chk_phone_length] CHECK  (((len(replace([country_code],'+',''))+len([phone_number]))<=(15)))
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [chk_phone_length]
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD CHECK  (([country_code] like '+%' AND [country_code] like '%[0-9]%' AND (len([country_code])>=(2) AND len([country_code])<=(5))))
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD CHECK  (([country_code] like '+%' AND [country_code] like '%[0-9]%' AND (len([country_code])>=(2) AND len([country_code])<=(5))))
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD CHECK  ((NOT [phone_number] like '%[^0-9]%' AND (len([phone_number])>=(4) AND len([phone_number])<=(12))))
GO
USE [master]
GO
ALTER DATABASE [lostnfound] SET  READ_WRITE 
GO
