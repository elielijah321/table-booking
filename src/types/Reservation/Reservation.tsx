export interface Reservation {
    id: string;
    partySize: number;
    date: Date;
    time: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    notes: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    pricePerItem: number;
}

export interface Offering {
  name: string;
  pricePerPerson: number;
}

export interface RestaurantInfo {
  name: string;
  reservation: Reservation;
  offering: Offering;
}

export interface IconProps {
  className?: string;
}

export interface BusinessInfo {
  id: string;
  businessName: string;
  businessOfferings: Offering[];
  maxCapacity: number;
  timeSlots: string[];
}


export interface CheckoutSession  {
  id: string;
  object: string;
  after_expiration: null;
  allow_promotion_codes: null;
  amount_subtotal: number;
  amount_total: number;
  automatic_tax: {
    enabled: boolean;
    liability: null;
    status: null;
  };
  billing_address_collection: null;
  cancel_url: string;
  client_reference_id: null;
  client_secret: null;
  consent: null;
  consent_collection: null;
  created: number;
  currency: string;
  currency_conversion: null;
  custom_fields: any[];
  custom_text: {
    after_submit: null;
    shipping_address: null;
    submit: null;
    terms_of_service_acceptance: null;
  };
  customer: null;
  customer_creation: string;
  customer_details: {
    address: {
      city: null;
      country: string;
      line1: null;
      line2: null;
      postal_code: string;
      state: null;
    };
    email: string;
    name: string;
    phone: string;
    tax_exempt: string;
    tax_ids: any[];
  };
  customer_email: null;
  expires_at: number;
  invoice: null;
  invoice_creation: {
    enabled: boolean;
    invoice_data: {
      account_tax_ids: null;
      custom_fields: null;
      description: null;
      footer: null;
      issuer: null;
      metadata: Record<string, any>;
      rendering_options: null;
    };
  };
  line_items: null;
  livemode: boolean;
  locale: null;
  metadata: Record<string, any>;
  mode: string;
  payment_intent: string;
  payment_link: null;
  payment_method_collection: string;
  payment_method_configuration_details: null;
  payment_method_options: {
    acss_debit: null;
    affirm: null;
    afterpay_clearpay: null;
    alipay: null;
    amazon_pay: null;
    au_becs_debit: null;
    bacs_debit: null;
    bancontact: null;
    boleto: null;
    card: {
      installments: null;
      request_three_d_secure: string;
      setup_future_usage: null;
      statement_descriptor_suffix_kana: null;
      statement_descriptor_suffix_kanji: null;
    };
    cashapp: null;
    customer_balance: null;
    eps: null;
    fpx: null;
    giropay: null;
    grabpay: null;
    ideal: null;
    klarna: null;
    konbini: null;
    link: null;
    mobilepay: null;
    multibanco: null;
    oxxo: null;
    p24: null;
    paynow: null;
    paypal: null;
    pix: null;
    revolut_pay: null;
    sepa_debit: null;
    sofort: null;
    swish: null;
    us_bank_account: null;
  };
  payment_method_types: string[];
  payment_status: string;
  phone_number_collection: {
    enabled: boolean;
  };
  recovered_from: null;
  redirect_on_completion: null;
  return_url: null;
  saved_payment_method_options: null;
  setup_intent: null;
  shipping_address_collection: null;
  shipping_cost: null;
  shipping_details: null;
  shipping_options: any[];
  status: string;
  submit_type: null;
  subscription: null;
  success_url: string;
  tax_id_collection: null;
  total_details: {
    amount_discount: number;
    amount_shipping: number;
    amount_tax: number;
    breakdown: null;
  };
  ui_mode: string;
  url: null;
};
