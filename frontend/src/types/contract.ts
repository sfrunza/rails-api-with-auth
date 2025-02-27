
export type TContract = {
  id: number;
  rate: number;
  start_time: number;
  end_time: number;
  time_off: number;
  main_crew_work_time: number;
  main_crew_total_cost: number;
  travel_time: number;
  travel_time_total_cost: number;
  total_time: number;
  total_time_total_cost: number;
  tips: number;
  discount: number;
  credit_card_processing_fee: number;
  grand_total: number;
  terms_signature: string | null;
  terms_signed_at: string | null;
  declaration_value_signature: string | null;
  declaration_value_signed_at: string | null;
  start_time_signature: string | null;
  start_time_signed_at: string | null;
  end_time_signature: string | null;
  end_time_signed_at: string;
  payment_signature: string | null;
  payment_signed_at: string | null;
  final_signature: string | null;
  final_signed_at: string | null;
  foreman_signature: string | null;
  foreman_signed_at: string | null;
  request: {
    id: number;
    moving_date: string;
    status: string;
    image_urls: string[];
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      role: string;
      email: string;
      phone: string;
    };
  };
}