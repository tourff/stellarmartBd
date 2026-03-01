-- ============================================
-- STELLARMARTBD SAMPLE DATA
-- ============================================

USE stellarmartbd;

-- ============================================
-- CATEGORIES (Main Categories with Subcategories)
-- ============================================

-- Electronics
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Electronics', 'ইলেকট্রনিক্স', 'electronics', 'Latest electronics and gadgets', 'laptop', TRUE, TRUE, 1);

-- Get Electronics ID and create subcategories
SET @electronics_id = LAST_INSERT_ID();

INSERT INTO categories (name_en, name_bn, slug, description, parent_id, is_featured, is_active, order_by) VALUES 
('Mobile Phones', 'মোবাইল ফোন', 'mobile-phones', 'Smartphones and feature phones', @electronics_id, TRUE, TRUE, 1),
('Laptops', 'ল্যাপটপ', 'laptops', 'Laptops and notebooks', @electronics_id, TRUE, TRUE, 2),
('Tablets', 'ট্যাবলেট', 'tablets', 'Tablets and iPads', @electronics_id, FALSE, TRUE, 3),
('Accessories', 'অ্যাক্সেসোরিজ', 'electronics-accessories', 'Phone and laptop accessories', @electronics_id, FALSE, TRUE, 4),
('Cameras', 'ক্যামেরা', 'cameras', 'Digital cameras and action cams', @electronics_id, FALSE, TRUE, 5),
('Audio', 'অডিও', 'audio', 'Headphones, speakers and audio gear', @electronics_id, FALSE, TRUE, 6),
('Gaming', 'গেমিং', 'gaming', 'Gaming consoles and accessories', @electronics_id, TRUE, TRUE, 7),
('Smart Watches', 'স্মার্ট ওয়াচ', 'smart-watches', 'Smart watches and fitness trackers', @electronics_id, TRUE, TRUE, 8);

-- Fashion
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Fashion', 'ফ্যাশন', 'fashion', 'Trending fashion items', 'shirt', TRUE, TRUE, 2);

SET @fashion_id = LAST_INSERT_ID();

INSERT INTO categories (name_en, name_bn, slug, description, parent_id, is_featured, is_active, order_by) VALUES 
('Men', 'পুরুষ', 'mens-fashion', 'Men clothing and accessories', @fashion_id, TRUE, TRUE, 1),
('Women', 'নারী', 'womens-fashion', 'Women clothing and accessories', @fashion_id, TRUE, TRUE, 2),
('Kids', 'শিশু', 'kids-fashion', 'Kids clothing and toys', @fashion_id, FALSE, TRUE, 3),
('Watches', 'ঘড়ি', 'watches', 'Men and women watches', @fashion_id, FALSE, TRUE, 4),
('Jewelry', 'আভরণ', 'jewelry', 'Gold, silver and fashion jewelry', @fashion_id, FALSE, TRUE, 5),
('Bags', 'ব্যাগ', 'bags', 'Handbags, wallets and luggage', @fashion_id, FALSE, TRUE, 6),
('Shoes', 'জুতা', 'shoes', 'Shoes for men and women', @fashion_id, FALSE, TRUE, 7);

-- Home & Living
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Home & Living', 'বাড়ি ও লিভিং', 'home-living', 'Furniture and home decor', 'sofa', TRUE, TRUE, 3);

SET @home_id = LAST_INSERT_ID();

INSERT INTO categories (name_en, name_bn, slug, description, parent_id, is_featured, is_active, order_by) VALUES 
('Furniture', 'ফার্নিচার', 'furniture', 'Sofas, beds and cabinets', @home_id, TRUE, TRUE, 1),
('Home Decor', 'হোম ডেকর', 'home-decor', 'Wall art, clocks and decorations', @home_id, FALSE, TRUE, 2),
('Lighting', 'লাইটিং', 'lighting', 'LED lights, lamps and bulbs', @home_id, FALSE, TRUE, 3),
('Kitchen', 'রান্নাঘর', 'kitchen', 'Kitchen appliances and utensils', @home_id, FALSE, TRUE, 4),
('Bedding', 'বেডিং', 'bedding', 'Mattresses, pillows and blankets', @home_id, FALSE, TRUE, 5),
('Curtains', 'পর্দা', 'curtains', 'Curtains and blinds', @home_id, FALSE, TRUE, 6);

-- Beauty & Health
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Beauty & Health', 'সৌন্দর্য ও স্বাস্থ্য', 'beauty-health', 'Beauty and health products', 'heart', TRUE, TRUE, 4);

SET @beauty_id = LAST_INSERT_ID();

INSERT INTO categories (name_en, name_bn, slug, description, parent_id, is_featured, is_active, order_by) VALUES 
('Skincare', 'স্কিনকেয়ার', 'skincare', 'Creams, lotions and serums', @beauty_id, TRUE, TRUE, 1),
('Makeup', 'মেকআপ', 'makeup', 'Lipstick, foundation and cosmetics', @beauty_id, TRUE, TRUE, 2),
('Hair Care', 'হেয়ার কেয়ার', 'hair-care', 'Shampoo, oil and hair products', @beauty_id, FALSE, TRUE, 3),
('Fragrances', 'পারফিউম', 'fragrances', 'Perfumes and deodorants', @beauty_id, FALSE, TRUE, 4),
('Health Supplements', 'হেল সাপ্লিমেন্ট', 'health-supplements', 'Vitamins and supplements', @beauty_id, FALSE, TRUE, 5),
('Fitness', 'ফিটনেস', 'fitness', 'Gym equipment and fitness gear', @beauty_id, FALSE, TRUE, 6);

-- Sports & Outdoors
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Sports & Outdoors', 'স্পোর্টস ও আউটডোরস', 'sports-outdoors', 'Sports equipment and outdoor gear', 'dumbbell', TRUE, TRUE, 5);

SET @sports_id = LAST_INSERT_ID();

INSERT INTO categories (name_en, name_bn, slug, description, parent_id, is_featured, is_active, order_by) VALUES 
('Cricket', 'ক্রিকেট', 'cricket', 'Cricket bats, balls and gear', @sports_id, TRUE, TRUE, 1),
('Football', 'ফুটবল', 'football', 'Football shoes and accessories', @sports_id, TRUE, TRUE, 2),
('Badminton', 'ব্যাডমিন্টন', 'badminton', 'Rackets, shuttles and nets', @sports_id, FALSE, TRUE, 3),
('Cycling', 'সাইক্লিং', 'cycling', 'Bicycles and cycling gear', @sports_id, FALSE, TRUE, 4),
('Camping', 'ক্যাম্পিং', 'camping', 'Tents and outdoor equipment', @sports_id, FALSE, TRUE, 5);

-- Books & Stationery
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Books & Stationery', 'বই ও স্টেশনারি', 'books-stationery', 'Books and office supplies', 'book', FALSE, TRUE, 6);

SET @books_id = LAST_INSERT_ID();

INSERT INTO categories (name_en, name_bn, slug, description, parent_id, is_featured, is_active, order_by) VALUES 
('Academic Books', 'একাডেমিক বই', 'academic-books', 'Textbooks and guides', @books_id, FALSE, TRUE, 1),
('Novels', 'উপন্যাস', 'novels', 'Fiction and non-fiction books', @books_id, FALSE, TRUE, 2),
('Stationery', 'স্টেশনারি', 'stationery', 'Pens, pencils and office supplies', @books_id, FALSE, TRUE, 3),
('Office Supplies', 'অফিস সাপ্লাইজ', 'office-supplies', 'Files, folders and desk items', @books_id, FALSE, TRUE, 4);

-- Automobile
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Automobile', 'অটোমোবাইল', 'automobile', 'Car and bike accessories', 'car', FALSE, TRUE, 7);

SET @auto_id = LAST_INSERT_ID();

INSERT INTO categories (name_en, name_bn, slug, description, parent_id, is_featured, is_active, order_by) VALUES 
('Car Electronics', 'কার ইলেকট্রনিক্স', 'car-electronics', 'Car speakers and GPS', @auto_id, FALSE, TRUE, 1),
('Bike Accessories', 'বাইক অ্যাক্সেসোরিজ', 'bike-accessories', 'Helmets and riding gear', @auto_id, FALSE, TRUE, 2),
('Car Care', 'কার কেয়ার', 'car-care', 'Cleaning and maintenance products', @auto_id, FALSE, TRUE, 3);

-- Toys & Games
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Toys & Games', 'খেলনা ও গেমস', 'toys-games', 'Toys and video games', 'gamepad-2', TRUE, TRUE, 8);

SET @toys_id = LAST_INSERT_ID();

INSERT INTO categories (name_en, name_bn, slug, description, parent_id, is_featured, is_active, order_by) VALUES 
('Action Figures', 'অ্যাকশন ফিগার', 'action-figures', 'Superhero and cartoon figures', @toys_id, FALSE, TRUE, 1),
('Remote Control', 'রিমোট কন্ট্রোল', 'remote-control', 'RC cars and drones', @toys_id, FALSE, TRUE, 2),
('Puzzles', 'পাজল', 'puzzles', 'Brain teasers and puzzles', @toys_id, FALSE, TRUE, 3),
('Video Games', 'ভিডিও গেমস', 'video-games', 'PS, Xbox and PC games', @toys_id, TRUE, TRUE, 4);

-- ============================================
-- BRANDS
-- ============================================

INSERT INTO brands (name_en, name_bn, slug, logo, description, is_featured, is_active) VALUES
('Samsung', 'স্যামসাং', 'samsung', NULL, 'Samsung electronics', TRUE, TRUE),
('Apple', 'অ্যাপল', 'apple', NULL, 'Apple products', TRUE, TRUE),
('Xiaomi', 'শাওমি', 'xiaomi', NULL, 'Xiaomi devices', TRUE, TRUE),
('Realme', 'রিয়েলমি', 'realme', NULL, 'Realme smartphones', TRUE, TRUE),
('Oppo', 'ওপো', 'oppo', NULL, 'Oppo smartphones', TRUE, TRUE),
('Vivo', 'ভিভো', 'vivo', NULL, 'Vivo smartphones', TRUE, TRUE),
('Huawei', 'হুয়াওয়ে', 'huawei', NULL, 'Huawei devices', FALSE, TRUE),
('OnePlus', 'ওয়ানপ্লাস', 'oneplus', NULL, 'OnePlus devices', FALSE, TRUE),
('Walton', 'ওয়ালটন', 'walton', NULL, 'Walton electronics', TRUE, TRUE),
('Singer', 'সিংগার', 'singer', NULL, 'Singer Bangladesh', FALSE, TRUE);

-- ============================================
-- SAMPLE PRODUCTS (Optional - for testing)
-- ============================================

-- Note: Products will be added through admin panel
