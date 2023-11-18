import { createClient } from '@supabase/supabase-js'

const URL = 'https://woixwxyqwcfmqntqgwax.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvaXh3eHlxd2NmbXFudHFnd2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxODQ2OTUsImV4cCI6MjAxNTc2MDY5NX0.ACaEWADlQVFr2KRkVwKdeyq_1FWqugsgxTdKA6wft2U';

export const supabase = createClient(URL, API_KEY);