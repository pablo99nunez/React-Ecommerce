import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetAllProducts($category: String!) {
    category(input: { title: $category }) {
      products {
        name
        id
        inStock
        attributes {
          name
          type
          items {
            value
          }
        }
        brand
        prices {
          currency {
            symbol
          }
          amount
        }
        gallery
      }
    }
  }
`;
export const GET_PRODUCT = gql`
  query getProduct($id: String!) {
    product(id: $id) {
      name
      gallery
      inStock
      id
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      description
      brand
      attributes {
        name
        type
        items {
          value
        }
      }
    }
  }
`;
