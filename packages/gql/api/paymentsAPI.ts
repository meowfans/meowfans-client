import { graphql } from '../generated';

export const PURCHASE_POST_MUTATION = graphql(`
  mutation PurchasePost($input: CreatePurchasePostInput!) {
    purchasePost(input: $input) {
      fanId
      id
      postId
      purchasedAt
    }
  }
`);

export const CREATE_TRANSACTION_MUTATION = graphql(`
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      requiresAction
      clientSecret
    }
  }
`);

export const ATTACH_PAYMENT_METHOD_MUTATION = graphql(`
  mutation AttachPaymentMethod($input: AttachPaymentMethodInput!) {
    attachPaymentMethod(input: $input) {
      paymentMethodId
      nextActionUrl
      clientSecret
    }
  }
`);

export const GET_CARD_OUTPUT_QUERY = graphql(`
  query GetCard {
    getCard {
      id
      card {
        brand
        country
        display_brand
        exp_month
        exp_year
        fingerprint
        funding
        generated_from
        last4
        regulated_status
        wallet
        checks {
          address_line1_check
          address_postal_code_check
          cvc_check
        }
        networks {
          available
          preferred
        }
        three_d_secure_usage {
          supported
        }
      }
      customer {
        address
        balance
        created
        currency
        default_source
        delinquent
        description
        discount
        email
        id
        invoice_prefix
        livemode
        name
        next_invoice_sequence
        object
        phone
        preferred_locales
        shipping
        tax_exempt
        test_clock
        invoice_settings {
          default_payment_method
          footer
        }
        metadata {
          userId
        }
      }
    }
  }
`);
