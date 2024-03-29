
import { createClient } from '@supabase/supabase-js'
let URL = 'https://uedlvktvwtbjascvxzid.supabase.co'
let ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZGx2a3R2d3RiamFzY3Z4emlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4NTI0MDYsImV4cCI6MjAwOTQyODQwNn0.u-Uzbk-R6xaJlVAAtj21qNHb7mdWOQ4N8KA3DE8-Czg'

const supabase = createClient(URL, ANON)

export { supabase }

