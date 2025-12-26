# Seed data for products and categories

categories_data = [
    {"id": 1, "name": "Electronics", "icon": "Smartphone", "image": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200"},
    {"id": 2, "name": "Fashion", "icon": "Shirt", "image": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200"},
    {"id": 3, "name": "Home & Furniture", "icon": "Home", "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200"},
    {"id": 4, "name": "Appliances", "icon": "Tv", "image": "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200"},
    {"id": 5, "name": "Books", "icon": "BookOpen", "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200"},
    {"id": 6, "name": "Toys", "icon": "Gamepad2", "image": "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200"},
    {"id": 7, "name": "Beauty", "icon": "Sparkles", "image": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200"},
    {"id": 8, "name": "Sports", "icon": "Dumbbell", "image": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200"},
]

products_data = [
    # Electronics
    {
        "name": "Apple iPhone 15 Pro",
        "category": "Electronics",
        "categoryId": 1,
        "price": 129900,
        "originalPrice": 149900,
        "discount": 13,
        "rating": 4.6,
        "reviews": 2847,
        "image": "https://images.unsplash.com/photo-1696446702183-cbd50e78d4e3?w=400",
        "images": [
            "https://images.unsplash.com/photo-1696446702183-cbd50e78d4e3?w=600",
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600",
            "https://images.unsplash.com/photo-1695048133300-70b8a7b5f9ac?w=600"
        ],
        "description": "A17 Pro chip. Titanium Design. Action button. All-day battery life.",
        "specifications": {
            "Display": "6.1-inch Super Retina XDR",
            "Chip": "A17 Pro",
            "Camera": "48MP Main | 12MP Ultra Wide",
            "Battery": "Up to 23 hours video playback",
            "Storage": "128GB"
        },
        "inStock": True,
        "fastDelivery": True
    },
    {
        "name": "Samsung Galaxy S24 Ultra",
        "category": "Electronics",
        "categoryId": 1,
        "price": 124999,
        "originalPrice": 139999,
        "discount": 11,
        "rating": 4.5,
        "reviews": 1923,
        "image": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
        "images": [
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600",
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
        ],
        "description": "Galaxy AI is here. 200MP camera. S Pen included. Titanium frame.",
        "specifications": {
            "Display": "6.8-inch Dynamic AMOLED 2X",
            "Processor": "Snapdragon 8 Gen 3",
            "Camera": "200MP + 50MP + 12MP + 10MP",
            "Battery": "5000mAh",
            "RAM": "12GB"
        },
        "inStock": True,
        "fastDelivery": True
    },
    {
        "name": "Sony WH-1000XM5 Headphones",
        "category": "Electronics",
        "categoryId": 1,
        "price": 29990,
        "originalPrice": 34990,
        "discount": 14,
        "rating": 4.7,
        "reviews": 3421,
        "image": "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
        "images": [
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=600"
        ],
        "description": "Industry-leading noise cancellation. 30-hour battery life. Premium sound quality.",
        "specifications": {
            "Type": "Over-Ear Wireless",
            "Battery": "Up to 30 hours",
            "Connectivity": "Bluetooth 5.2",
            "Weight": "250g"
        },
        "inStock": True,
        "fastDelivery": True
    },
    {
        "name": "MacBook Air M3",
        "category": "Electronics",
        "categoryId": 1,
        "price": 114900,
        "originalPrice": 119900,
        "discount": 4,
        "rating": 4.8,
        "reviews": 1567,
        "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        "images": [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600"
        ],
        "description": "M3 chip. Up to 18 hours battery. Liquid Retina display. Superlight design.",
        "specifications": {
            "Chip": "Apple M3",
            "Display": "13.6-inch Liquid Retina",
            "Memory": "8GB unified memory",
            "Storage": "256GB SSD"
        },
        "inStock": True,
        "fastDelivery": False
    },
    # Fashion
    {
        "name": "Levi's Men's Slim Fit Jeans",
        "category": "Fashion",
        "categoryId": 2,
        "price": 1899,
        "originalPrice": 3999,
        "discount": 53,
        "rating": 4.3,
        "reviews": 8934,
        "image": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
        "images": [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600"
        ],
        "description": "Classic slim fit jeans in dark blue. Comfortable stretch denim.",
        "specifications": {
            "Fit": "Slim",
            "Material": "98% Cotton, 2% Elastane",
            "Wash": "Dark Blue",
            "Closure": "Zipper"
        },
        "inStock": True,
        "fastDelivery": True
    },
    {
        "name": "Women's Ethnic Kurta Set",
        "category": "Fashion",
        "categoryId": 2,
        "price": 1299,
        "originalPrice": 2999,
        "discount": 57,
        "rating": 4.2,
        "reviews": 5621,
        "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
        "images": [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600"
        ],
        "description": "Beautiful printed kurta with palazzo. Perfect for festivals and occasions.",
        "specifications": {
            "Type": "Kurta Set",
            "Material": "Cotton Blend",
            "Pattern": "Printed",
            "Occasion": "Casual, Festive"
        },
        "inStock": True,
        "fastDelivery": True
    },
    {
        "name": "Nike Air Max Sneakers",
        "category": "Fashion",
        "categoryId": 2,
        "price": 7995,
        "originalPrice": 10995,
        "discount": 27,
        "rating": 4.5,
        "reviews": 4329,
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        "images": [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
        ],
        "description": "Classic Nike Air Max with cushioned comfort. All-day wearability.",
        "specifications": {
            "Brand": "Nike",
            "Type": "Sneakers",
            "Material": "Mesh and Synthetic",
            "Sole": "Rubber"
        },
        "inStock": True,
        "fastDelivery": False
    },
    {
        "name": "Formal Shirt for Men",
        "category": "Fashion",
        "categoryId": 2,
        "price": 799,
        "originalPrice": 1999,
        "discount": 60,
        "rating": 4.1,
        "reviews": 6782,
        "image": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",
        "images": [
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600"
        ],
        "description": "Crisp white formal shirt. Perfect for office and formal events.",
        "specifications": {
            "Type": "Formal Shirt",
            "Material": "100% Cotton",
            "Collar": "Regular",
            "Fit": "Regular"
        },
        "inStock": True,
        "fastDelivery": True
    },
    # Home & Furniture
    {
        "name": "3-Seater Fabric Sofa",
        "category": "Home & Furniture",
        "categoryId": 3,
        "price": 24999,
        "originalPrice": 44999,
        "discount": 44,
        "rating": 4.4,
        "reviews": 892,
        "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
        "images": [
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"
        ],
        "description": "Modern L-shaped sofa with premium fabric. Comfortable seating for family.",
        "specifications": {
            "Seating": "3-Seater",
            "Material": "Fabric",
            "Color": "Grey",
            "Dimensions": "210 x 90 x 85 cm"
        },
        "inStock": True,
        "fastDelivery": False
    },
    {
        "name": "Queen Size Bed with Storage",
        "category": "Home & Furniture",
        "categoryId": 3,
        "price": 18999,
        "originalPrice": 32999,
        "discount": 42,
        "rating": 4.3,
        "reviews": 1234,
        "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
        "images": [
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"
        ],
        "description": "Engineered wood bed with hydraulic storage. Space-saving design.",
        "specifications": {
            "Size": "Queen (60 x 78 inch)",
            "Material": "Engineered Wood",
            "Storage": "Yes - Hydraulic",
            "Color": "Walnut Brown"
        },
        "inStock": True,
        "fastDelivery": False
    },
    {
        "name": "Study Table with Chair",
        "category": "Home & Furniture",
        "categoryId": 3,
        "price": 5999,
        "originalPrice": 9999,
        "discount": 40,
        "rating": 4.2,
        "reviews": 2145,
        "image": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400",
        "images": [
            "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600"
        ],
        "description": "Compact study table with ergonomic chair. Perfect for work from home.",
        "specifications": {
            "Material": "Engineered Wood",
            "Dimensions": "120 x 60 x 75 cm",
            "Chair": "Included",
            "Storage": "Drawer and Shelf"
        },
        "inStock": True,
        "fastDelivery": True
    },
    # Appliances
    {
        "name": "LG 7.5kg Washing Machine",
        "category": "Appliances",
        "categoryId": 4,
        "price": 19990,
        "originalPrice": 27990,
        "discount": 29,
        "rating": 4.4,
        "reviews": 3421,
        "image": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400",
        "images": [
            "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600"
        ],
        "description": "Fully automatic top load. Smart inverter technology. Energy efficient.",
        "specifications": {
            "Capacity": "7.5 kg",
            "Type": "Fully Automatic Top Load",
            "Energy Rating": "5 Star",
            "Warranty": "2 Years"
        },
        "inStock": True,
        "fastDelivery": False
    },
    {
        "name": "Samsung 1.5 Ton AC",
        "category": "Appliances",
        "categoryId": 4,
        "price": 32990,
        "originalPrice": 45990,
        "discount": 28,
        "rating": 4.5,
        "reviews": 2876,
        "image": "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=400",
        "images": [
            "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=600"
        ],
        "description": "Split inverter AC. Fast cooling. Low noise operation.",
        "specifications": {
            "Capacity": "1.5 Ton",
            "Type": "Split Inverter",
            "Energy Rating": "3 Star",
            "Warranty": "1 Year + 5 Year Compressor"
        },
        "inStock": True,
        "fastDelivery": False
    },
    {
        "name": "Philips Air Fryer",
        "category": "Appliances",
        "categoryId": 4,
        "price": 7999,
        "originalPrice": 12995,
        "discount": 38,
        "rating": 4.6,
        "reviews": 5432,
        "image": "https://images.unsplash.com/photo-1585237672738-496fb87c31f3?w=400",
        "images": [
            "https://images.unsplash.com/photo-1585237672738-496fb87c31f3?w=600"
        ],
        "description": "Cook healthy with 80% less fat. Digital touchscreen. 4.1L capacity.",
        "specifications": {
            "Capacity": "4.1 Liters",
            "Power": "1400W",
            "Control": "Digital Touchscreen",
            "Warranty": "2 Years"
        },
        "inStock": True,
        "fastDelivery": True
    },
    # Books
    {
        "name": "Atomic Habits by James Clear",
        "category": "Books",
        "categoryId": 5,
        "price": 399,
        "originalPrice": 599,
        "discount": 33,
        "rating": 4.7,
        "reviews": 12543,
        "image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
        "images": [
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600"
        ],
        "description": "Transform your life with tiny changes. #1 New York Times Bestseller.",
        "specifications": {
            "Author": "James Clear",
            "Pages": "320",
            "Language": "English",
            "Binding": "Paperback"
        },
        "inStock": True,
        "fastDelivery": True
    },
    {
        "name": "The Psychology of Money",
        "category": "Books",
        "categoryId": 5,
        "price": 299,
        "originalPrice": 450,
        "discount": 34,
        "rating": 4.6,
        "reviews": 9876,
        "image": "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400",
        "images": [
            "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600"
        ],
        "description": "Timeless lessons on wealth, greed, and happiness by Morgan Housel.",
        "specifications": {
            "Author": "Morgan Housel",
            "Pages": "256",
            "Language": "English",
            "Binding": "Paperback"
        },
        "inStock": True,
        "fastDelivery": True
    }
]
