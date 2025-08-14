// public/images/1.jpg ~ 6.jpg 사용
// ✅ BASE_URL은 '/react-cart-mobile/' 처럼 경로만 오므로 문자열 결합로 처리
const BASE = (import.meta.env && import.meta.env.BASE_URL) || "/";

const img = (name) => `${BASE}images/${name}`;

const products = [
  {
    id: 1,
    brand: "브랜드A",
    description: "편안하고 착용감이 좋은 신발",
    price: 35000,
    image: img("1.jpg"),
  },
  {
    id: 2,
    brand: "브랜드A",
    description: "힙한 컬러가 매력적인 신발",
    price: 25000,
    image: img("2.jpg"),
  },
  {
    id: 3,
    brand: "브랜드B",
    description: "편안하고 착용감이 좋은 신발",
    price: 35000,
    image: img("3.jpg"),
  },
  {
    id: 4,
    brand: "브랜드B",
    description: "힙한 컬러가 매력적인 신발",
    price: 35000,
    image: img("4.jpg"),
  },
  {
    id: 5,
    brand: "브랜드C",
    description: "편안하고 착용감이 좋은 신발",
    price: 35000,
    image: img("5.jpg"),
  },
  {
    id: 6,
    brand: "브랜드C",
    description: "힙한 컬러가 매력적인 신발",
    price: 35000,
    image: img("6.jpg"),
  },
];

export default products;
