import cknLettuceWrapsImg from '../assets/images/appetizers/chicken-lettuce-wraps.webp';
import chiliBeansImg from '../assets/images/appetizers/chili-garlic-green-beans.webp';
import crispyBeansImg from '../assets/images/appetizers/crispy-green-beans.webp';
import edamameImg from '../assets/images/appetizers/edamame.webp';
import porkDumplingsImg from '../assets/images/appetizers/pork-dumplings.webp';
import porkEggRollsImg from '../assets/images/appetizers/pork-egg-rolls.webp';
import shrimpDumplingsImg from '../assets/images/appetizers/shrimp-dumplings.webp';
import calamariImg from '../assets/images/appetizers/tempura-calamari.webp';
import vegSpringRollsImg from '../assets/images/appetizers/vegetable-spring-rolls.webp';

import cokeImg from '../assets/images/beverages/coke.webp';
import fijiImg from '../assets/images/beverages/fiji-water.webp';
import teaImg from '../assets/images/beverages/freshly-brewed-tea.webp';
import sanPellegrinoImg from '../assets/images/beverages/san-pellegrino.webp';

import beefBrocBowlImg from '../assets/images/bowls/beef-broccoli-bowl.webp';
import honShrimpBowlImg from '../assets/images/bowls/crispy-honey-shrimp-bowl.webp';
import gingCknBowlImg from '../assets/images/bowls/ginger-chicken-broccoli-bowl.webp';
import kpCknBowlImg from '../assets/images/bowls/kung-pao-chicken-bowl.webp';
import kpShrimpBowlImg from '../assets/images/bowls/kung-pao-shrimp-bowl.webp';
import mongBeefBowlImg from '../assets/images/bowls/mongolian-beef-bowl.webp';
import orngCknBowlImg from '../assets/images/bowls/orange-chicken-bowl.webp';
import sweetSourCknBowlImg from '../assets/images/bowls/sweet-sour-chicken-bowl.webp';

import friedRiceImg from '../assets/images/fried-rice-noodles/fried-rice.webp';
import koreanNoodleImg from '../assets/images/fried-rice-noodles/korean-glass-noodles.webp';
import padThaiImg from '../assets/images/fried-rice-noodles/pad-thai.webp';
import shortRibRiceImg from '../assets/images/fried-rice-noodles/short-rib-fried-rice.webp';
import loMeinImg from '../assets/images/fried-rice-noodles/signature-lo-mein.webp';
import singaporeNoodleImg from '../assets/images/fried-rice-noodles/singapore-street-noodles.webp';

import beefBrocImg from '../assets/images/main-entree/beef-broccoli.webp';
import honShrimpImg from '../assets/images/main-entree/crispy-honey-shrimp.webp';
import gingCknImg from '../assets/images/main-entree/ginger-chicken-broccoli.webp'; 4
import kpCknImg from '../assets/images/main-entree/kung-pao-chicken.webp';
import kpShrimpImg from '../assets/images/main-entree/kung-pao-shrimp.webp';
import mapoTofuImg from '../assets/images/main-entree/ma-po-tofu.webp';
import mongBeefImg from '../assets/images/main-entree/mongolian-beef.webp';
import orngCknImg from '../assets/images/main-entree/orange-chicken.webp';
import spShrimpImg from '../assets/images/main-entree/salt-pepper-prawns.webp';
import sweetSourCknImg from '../assets/images/main-entree/sweet-sour-chicken.webp';

import brownRiceImg from '../assets/images/side-orders/brown-rice.webp';
import sauceImg from '../assets/images/side-orders/signature-sauce.webp';
import whiteRiceImg from '../assets/images/side-orders/white-rice.webp';

import eggDropSoupImg from '../assets/images/soups/egg-drop-soup.webp';
import hotSourSoupImg from '../assets/images/soups/hot-sour-soup.webp';
import spicyCknSoupImg from '../assets/images/soups/spicy-chicken-soup.webp';
import wontonSoupImg from '../assets/images/soups/wonton-soup.webp';

import { MenuItem, CustomOption } from "../../types";

export const bowlOptions: CustomOption[] = [
    {
        id: 'white-rice',
        name: 'White Rice'
    },
    {
        id: 'brown-rice',
        name: 'Brown Rice'
    },
    {
        id: 'half-rice',
        name: '1/2 White 1/2 Brown'
    },
]

export const menuDataArray: MenuItem[] = [
    {
        id: 'chicken-lettuce-wraps',
        category: 'appetizers',
        imgSrc: cknLettuceWrapsImg,
        name: 'Chicken Lettuce Wraps',
        description: 'A secret family recipe and our signature dish. Enough said.',
        price: '16.00',
        quantity:1
    },
    {
        id: 'chili-garlic-green-beans',
        category: 'appetizers',
        imgSrc: chiliBeansImg,
        name: 'Chili Garlic Green Beans',
        description: 'Fiery red chili sauce, fresh garlic, & Sichuan preserves',
        price: '10.00',
        quantity:1
    },
    {
        id: 'crispy-green-beans',
        category: 'appetizers',
        imgSrc: crispyBeansImg,
        name: 'Crispy Green Beans',
        description: 'Tempura-battered, signature spicy dipping sauce',
        price: '12.50',
        quantity:1
    },
    {
        id: 'edamame',
        category: 'appetizers',
        imgSrc: edamameImg,
        name: 'Edamame',
        description: 'Steamed to order, tossed with kosher salt',
        price: '10.00',
        quantity:1
    },
    {
        id: 'tempura-calamari',
        category: 'appetizers',
        imgSrc: calamariImg,
        name: 'Tempura Calamari',
        description: 'Crisp calamari, hunan salt, wasabi aioli dipping sauce',
        price: '15.50',
        quantity:1
    },
    {
        id: 'pork-dumplings',
        category: 'appetizers',
        imgSrc: porkDumplingsImg,
        name: 'Pork Dumplings | 6 Count',
        description: 'Pan-fried or steamed, light chili sauce drizzle',
        price: '14.50',
        quantity:1,
        dumpling: [
            {
                id: 'pan-fried',
                name: 'Pan Fried'
            },
            {
                id: 'steamed',
                name: 'Steamed'
            }
        ]
    },
    {
        id: 'shrimp-dumplings',
        category: 'appetizers',
        imgSrc: shrimpDumplingsImg,
        name: 'Shrimp Dumplings | 6 Count',
        description: 'Pan-fried or steamed, light chili sauce drizzle',
        price: '14.00',
        quantity:1,
        dumpling: [
            {
                id: 'pan-fried',
                name: 'Pan Fried'
            },
            {
                id: 'steamed',
                name: 'Steamed'
            }
        ]
    },
    {
        id: 'pork-egg-rolls',
        category: 'appetizers',
        imgSrc: porkEggRollsImg,
        name: 'Pork Egg Rolls | 2 Count',
        description: 'Hand-rolled with julienned veggies, sweet and sour mustard sauce',
        price: '10.50',
        quantity:1

    },
    {
        id: 'vegetable-spring-rolls',
        category: 'appetizers',
        imgSrc: vegSpringRollsImg,
        name: 'Vegetable Spring Rolls | 3 Count',
        description: 'Crispy rolls with julienned veggies, sweet chili dipping sauce',
        price: '10.00',
        quantity:1
    },
    {
        id: 'egg-drop-soup',
        category: 'soups',
        imgSrc: eggDropSoupImg,
        name: 'Egg Drop Soup',
        description: 'Velvety broth, julienned carrots, green onion',
        price: '0.00',
        quantity:1,
        soup: [
            {
                id: 'cup',
                name: 'Cup',
                price: '7.50'
            },
            {
                id: 'bowl',
                name: 'Bowl',
                price: '12.50'
            },
        ]
    },
    {
        id: 'hot-sour-soup',
        category: 'soups',
        imgSrc: hotSourSoupImg,
        name: 'Hot & Sour Soup',
        description: 'Rich and tangy broth, silken tofu, chicken, bamboo shoots, egg',
        price: '0.00',
        quantity:1,
        soup: [
            {
                id: 'cup',
                name: 'Cup',
                price: '7.50'
            },
            {
                id: 'bowl',
                name: 'Bowl',
                price: '12.50'
            },
        ]
    },
    {
        id: 'spicy-chicken-soup',
        category: 'soups',
        imgSrc: spicyCknSoupImg,
        name: 'Spicy Chicken Nooodle Soup',
        description: 'Pad Thai noodles, veggies, spicy broth',
        price: '0.00',
        quantity:1,
        soup: [
            {
                id: 'cup',
                name: 'Cup',
                price: '8.50'
            },
            {
                id: 'bowl',
                name: 'Bowl',
                price: '13.50'
            },
        ]
    },
    {
        id: 'wonton-soup',
        category: 'soups',
        imgSrc: wontonSoupImg,
        name: 'Wonton Soup',
        description: 'Savory broth, house-made pork wontons, shrimp, chicken',
        price: '0.00',
        quantity:1,
        soup: [
            {
                id: 'cup',
                name: 'Cup',
                price: '7.50'
            },
            {
                id: 'bowl',
                name: 'Bowl',
                price: '12.50'
            },
        ]
    },
    {
        id: 'beef-broccoli',
        category: 'main-entree',
        imgSrc: beefBrocImg,
        name: 'Beef with Broccoli',
        description: 'Flank steak, ginger-garlic aromatics, green onion, steamed broccoli',
        price: '22.00',
        quantity:1,
    },
    {
        id: 'crispy-honey-shrimp',
        category: 'main-entree',
        imgSrc: honShrimpImg,
        name: 'Crispy Honey Shrimp',
        description: 'Lightly battered, tangy honey sauce, green onion',
        price: '24.50',
        quantity:1,
    },
    {
        id: 'ginger-chicken-broccoli',
        category: 'main-entree',
        imgSrc: gingCknImg,
        name: 'Ginger Chicken with Broccoli',
        description: 'Ginger-garlic aromatics, green onion, steamed broccoli',
        price: '22.00',
        quantity:1,
    },
    {
        id: 'kung-pao-chicken',
        category: 'main-entree',
        imgSrc: kpCknImg,
        name: 'Kung Pao Chicken',
        description: 'Spicy Sichuan chili sauce, peanuts, green onion, red chili peppers',
        price: '23.00',
        quantity:1,
    },
    {
        id: 'kung-pao-shrimp',
        category: 'main-entree',
        imgSrc: kpShrimpImg,
        name: 'Kung Pao Shrimp',
        description: 'Spicy Sichuan chili sauce, peanuts, green onion, red chili peppers',
        price: '25.00',
        quantity:1,
    },
    {
        id: 'ma-po-tofu',
        category: 'main-entree',
        imgSrc: mapoTofuImg,
        name: 'Ma Po Tofu',
        description: 'Crispy silken tofu, spicy red chili sauce, steamed broccoli',
        price: '18.00',
        quantity:1,
    },
    {
        id: 'mongolian-beef',
        category: 'main-entree',
        imgSrc: mongBeefImg,
        name: 'Mongolian Beef',
        description: 'Sweet soy glaze, flank steak, garlic, snipped green onion',
        price: '26.00',
        quantity:1,
    },
    {
        id: 'orange-chicken',
        category: 'main-entree',
        imgSrc: orngCknImg,
        name: 'Orange Chicken',
        description: 'Lightly battered, sweet citrus chili sauce, fresh orange slice',
        price: '19.50',
        quantity:1,
    },
    {
        id: 'salt-pepper-prawns',
        category: 'main-entree',
        imgSrc: spShrimpImg,
        name: 'Salt & Pepper Prawns',
        description: 'Crisp prawns, aromatics, chili peppers, tossed in a spicy chili butter',
        price: '27.00',
        quantity:1,
    },
    {
        id: 'sweet-sour-chicken',
        category: 'main-entree',
        imgSrc: sweetSourCknImg,
        name: 'Sweet & Sour Chicken',
        description: 'Sweet & sour sauce, pineapple, onion, bell peppers, ginger',
        price: '18.00',
        quantity:1,
    },
    {
        id: 'beef-broccoli-bowl',
        category: 'bowls',
        imgSrc: beefBrocBowlImg,
        name: 'Beef with Broccoli Bowl',
        description: 'Flank steak, ginger-garlic aromatics, green onion, steamed broccoli',
        price: '17.50',
        bowl: bowlOptions,
        quantity:1,
    },
    {
        id: 'crispy-honey-shrimp-bowl',
        category: 'bowls',
        imgSrc: honShrimpBowlImg,
        name: 'Crispy Honey Shrimp Bowl',
        description: 'Lightly battered, tangy honey sauce, green onion',
        price: '19.50',
        bowl: bowlOptions,
        quantity:1,
    },
    {
        id: 'ginger-chicken-broccoli-bowl',
        category: 'bowls',
        imgSrc: gingCknBowlImg,
        name: 'Ginger Chicken with Broccoli Bowl',
        description: 'Ginger-garlic aromatics, green onion, steamed broccoli',
        price: '15.50',
        bowl: bowlOptions,
        quantity:1,
    },
    {
        id: 'kung-pao-chicken-bowl',
        category: 'bowls',
        imgSrc: kpCknBowlImg,
        name: 'Kung Pao Chicken Bowl',
        description: 'Spicy Sichuan chili sauce, peanuts, green onion, red chili peppers',
        price: '15.50',
        bowl: bowlOptions,
        quantity:1,
    },
    {
        id: 'kung-pao-shrimp-bowl',
        category: 'bowls',
        imgSrc: kpShrimpBowlImg,
        name: 'Kung Pao Shrimp Bowl',
        description: 'Spicy Sichuan chili sauce, peanuts, green onion, red chili peppers',
        price: '19.50',
        bowl: bowlOptions,
        quantity:1,
    },
    {
        id: 'mongolian-beef-bowl',
        category: 'bowls',
        imgSrc: mongBeefBowlImg,
        name: 'Mongolian Beef Bowl',
        description: 'Sweet soy glaze, flank steak, garlic, snipped green onion',
        price: '17.50',
        bowl: bowlOptions,
        quantity:1,
    },
    {
        id: 'orange-chicken-bowl',
        category: 'bowls',
        imgSrc: orngCknBowlImg,
        name: 'Orange Chicken Bowl',
        description: 'Lightly battered, sweet citrus chili sauce, fresh orange slice',
        price: '15.50',
        bowl: bowlOptions,
        quantity:1,
    },
    {
        id: 'sweet-sour-chicken-bowl',
        category: 'bowls',
        imgSrc: sweetSourCknBowlImg,
        name: 'Sweet & Sour Chicken Bowl',
        description: 'Sweet & sour sauce, pineapple, onion, bell peppers, ginger',
        price: '15.50',
        bowl: bowlOptions,
        quantity:1,
    },
    {
        id: 'fried-rice',
        category: 'fried-rice-noodles',
        name: 'Fried Rice',
        imgSrc: friedRiceImg,
        description: 'Wok-tossed with egg, carrots, bean sprouts, green onion',
        price: '0.00',
        quantity:1,
        protein: [
            {
                id: 'vegetable',
                name: 'Vegetable',
                price: '16.00'
            },
            {
                id: 'chicken',
                name: 'Chicken',
                price: '17.00'
            },
            {
                id: 'shrimp',
                name: 'Shrimp',
                price: '18.00'
            },
            {
                id: 'beef',
                name: 'Beef',
                price: '18.00'
            },
            {
                id: 'pork',
                name: 'Pork',
                price: '18.00'
            },
            {
                id: 'combo',
                name: 'Combo',
                price: '19.00'
            }
        ]
    },
    {
        id: 'short-rib-fried-rice',
        category: 'fried-rice-noodles',
        imgSrc: shortRibRiceImg,
        name: 'Short Rib Fried Rice',
        description: 'Slow-braised beef short rib, kimchi, mushrooms, edamame, egg, wasabi mayo, green onion',
        price: '22.00',
        quantity:1,
    },
    {
        id: 'korean-glass-noodles',
        category: 'fried-rice-noodles',
        imgSrc: koreanNoodleImg,
        name: 'Korean Glass Noodles',
        description: 'Sweet potato glass noodles, onion, shiitakes, bell pepper, egg, sweet-spicy sauce',
        price: '0.00',
        quantity:1,
        protein: [
            {
                id: 'vegetable',
                name: 'Vegetable',
                price: '20.50'
            },
            {
                id: 'chicken',
                name: 'Chicken',
                price: '21.50'
            },
            {
                id: 'beef',
                name: 'Beef',
                price: '22.50'
            },
            {
                id: 'combo',
                name: 'Combo',
                price: '23.50'
            }
        ]
    },
    {
        id: 'pad-thai',
        category: 'fried-rice-noodles',
        imgSrc: padThaiImg,
        name: 'Pad Thai',
        description: 'Rice noodles, Thai spices, tofu, green onion, peanuts',
        price: '0.00',
        quantity:1,
        protein: [
            {
                id: 'chicken',
                name: 'Chicken',
                price: '20.00'
            },
            {
                id: 'shrimp',
                name: 'Shrimp',
                price: '22.50'
            },
            {
                id: 'combo',
                name: 'Combo',
                price: '23.50'
            }
        ]
    },
    {
        id: 'signature-lo-mein',
        category: 'fried-rice-noodles',
        imgSrc: loMeinImg,
        name: 'Signature Lo Mein',
        description: 'Wok-tossed noodles, mushrooms, Asian vegetables, savory soy sauce',
        price: '0.00',
        quantity:1,
        protein: [
            {
                id: 'vegetable',
                name: 'Vegetable',
                price: '16.50'
            },
            {
                id: 'chicken',
                name: 'Chicken',
                price: '17.50'
            },
            {
                id: 'shrimp',
                name: 'Shrimp',
                price: '18.50'
            },
            {
                id: 'beef',
                name: 'Beef',
                price: '18.50'
            },
            {
                id: 'pork',
                name: 'Pork',
                price: '18.50'
            },
            {
                id: 'combo',
                name: 'Combo',
                price: '19.50'
            }
        ]
    },
    {
        id: 'singapore-street-noodles',
        category: 'fried-rice-noodles',
        imgSrc: singaporeNoodleImg,
        name: 'Singapore Street Noodles',
        description: 'Thin rice noodles, light curry sauce, chicken, shrimp, onion, julienned vegetables',
        price: '19.50',
        quantity:1
    },
    {
        id: 'white-rice',
        category: 'side-orders',
        imgSrc: whiteRiceImg,
        name: 'White Rice 6 oz',
        description: 'Steamed',
        price: '1.50',
        quantity:1
    },
    {
        id: 'brown-rice',
        imgSrc: brownRiceImg,
        category: 'side-orders',
        name: 'Brown Rice 6 oz',
        description: 'Steamed',
        price: '1.75',
        quantity:1
    },
    {
        id: 'signature-sauce',
        category: 'side-orders',
        imgSrc: sauceImg,
        name: 'Signature Sauce 1 oz',
        description: 'Hot mustard, chili paste, and potsticker sauce - mixed and ready to enjoy',
        price: '0.75',
        quantity:1
    },
    {
        id: 'coke',
        category: 'beverages',
        imgSrc: cokeImg,
        name: 'Coca-Cola Soft Drinks',
        description: '',
        price: '4.00',
        quantity:1,
        coke: [
            {
                id: 'coke',
                name: 'Coke'
            },
            {
                id: 'diet-coke',
                name: 'Diet Coke'
            },
            {
                id: 'sprite',
                name: 'Sprite'
            },
            {
                id: 'coke-zero-sugar',
                name: 'Coke Zero Sugar'
            },
            {
                id: 'pibb-xtra',
                name: 'Pibb Xtra'
            }
        ]
    },
    {
        id: 'freshly-brewed-tea',
        category: 'beverages',
        imgSrc: teaImg,
        name: 'Freshly Brewed Tea',
        description: '',
        price: '4.00',
        quantity:1,
        tea: [
            {
                id: 'black-tea',
                name: 'Black Iced Tea',
            },
            {
                id: 'mango-tea',
                name: 'Mango Iced Tea',
            }
        ]
    },
    {
        id: 'fiji-water',
        category: 'beverages',
        imgSrc: fijiImg,
        name: 'Fiji Water 1L',
        description: '',
        price: '6.00',
        quantity:1,
    },
    {
        id: 'san-pellegrino',
        imgSrc: sanPellegrinoImg,
        category: 'beverages',
        name: 'San Pellegrino 1L',
        description: '',
        price: '6.00',
        quantity:1,
    },
];