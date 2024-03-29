import type { Database as DB } from "@/lib/database.types";

declare global {
  type Database = DB;
  type matches =  DB["public"]["Tables"]["matches"]["Row"];
  type players =  DB["public"]["Tables"]["players"]["Row"];
  type stats =  DB["public"]["Tables"]["stats"]["Row"];
  type teams =  DB["public"]["Tables"]["teams"]["Row"];
  type myteams =  DB["public"]["Tables"]["myteams"]["Row"];
}