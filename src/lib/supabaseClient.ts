import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tnubynghzxjlttmpavbn.supabase.co'
const supabaseKey = 'sbp_982e242788fe0ddac387a58960465c0148c6422f'

export const supabase = createClient(supabaseUrl, supabaseKey)