export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      matches: {
        Row: {
          localScore: number | null;
          localTeamID: number | null;
          matchDate: string | null;
          matchID: number;
          matchState: number | null;
          visitorScore: number | null;
          visitorTeamID: number | null;
          week: number | null;
        };
        Insert: {
          localScore?: number | null;
          localTeamID?: number | null;
          matchDate?: string | null;
          matchID: number;
          matchState?: number | null;
          visitorScore?: number | null;
          visitorTeamID?: number | null;
          week?: number | null;
        };
        Update: {
          localScore?: number | null;
          localTeamID?: number | null;
          matchDate?: string | null;
          matchID?: number;
          matchState?: number | null;
          visitorScore?: number | null;
          visitorTeamID?: number | null;
          week?: number | null;
        };
        Relationships: [];
      };
      myteams: {
        Row: {
          created_at: string;
          myTeamID: number;
          name: string | null;
          players: string[] | null;
        };
        Insert: {
          created_at?: string;
          myTeamID?: number;
          name?: string | null;
          players?: string[] | null;
        };
        Update: {
          created_at?: string;
          myTeamID?: number;
          name?: string | null;
          players?: string[] | null;
        };
        Relationships: [];
      };
      news: {
        Row: {
          content: string | null;
          cover_photo_url: string | null;
          created_at: string;
          id: string;
          published: boolean | null;
          tag: Json | null;
          title: string | null;
          updated_at: string | null;
        };
        Insert: {
          content?: string | null;
          cover_photo_url?: string | null;
          created_at?: string;
          id?: string;
          published?: boolean | null;
          tag?: Json | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Update: {
          content?: string | null;
          cover_photo_url?: string | null;
          created_at?: string;
          id?: string;
          published?: boolean | null;
          tag?: Json | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      players: {
        Row: {
          averagePoints: number | null;
          image: string | null;
          lastMarketChange: number | null;
          marketValue: number | null;
          marketValues: Json | null;
          name: string | null;
          nickname: string | null;
          playerID: number;
          points: number | null;
          position: string | null;
          positionID: number | null;
          previousMarketValue: number | null;
          status: string | null;
          teamID: number | null;
          teamName: string | null;
        };
        Insert: {
          averagePoints?: number | null;
          image?: string | null;
          lastMarketChange?: number | null;
          marketValue?: number | null;
          marketValues?: Json | null;
          name?: string | null;
          nickname?: string | null;
          playerID: number;
          points?: number | null;
          position?: string | null;
          positionID?: number | null;
          previousMarketValue?: number | null;
          status?: string | null;
          teamID?: number | null;
          teamName?: string | null;
        };
        Update: {
          averagePoints?: number | null;
          image?: string | null;
          lastMarketChange?: number | null;
          marketValue?: number | null;
          marketValues?: Json | null;
          name?: string | null;
          nickname?: string | null;
          playerID?: number;
          points?: number | null;
          position?: string | null;
          positionID?: number | null;
          previousMarketValue?: number | null;
          status?: string | null;
          teamID?: number | null;
          teamName?: string | null;
        };
        Relationships: [];
      };
      roles: {
        Row: {
          email: string;
          role: string | null;
        };
        Insert: {
          email: string;
          role?: string | null;
        };
        Update: {
          email?: string;
          role?: string | null;
        };
        Relationships: [];
      };
      stats: {
        Row: {
          ball_recovery: Json | null;
          effective_clearance: Json | null;
          goal_assist: Json | null;
          goals: Json | null;
          goals_conceded: Json | null;
          isInIdealFormation: boolean | null;
          marca_points: Json | null;
          mins_played: Json | null;
          offtarget_att_assist: Json | null;
          own_goals: Json | null;
          pen_area_entries: Json | null;
          penalty_conceded: Json | null;
          penalty_failed: Json | null;
          penalty_save: Json | null;
          penalty_won: Json | null;
          playerID: number;
          poss_lost_all: Json | null;
          red_card: Json | null;
          saves: Json | null;
          second_yellow_card: Json | null;
          total_scoring_att: Json | null;
          totalPoints: number | null;
          week: number;
          won_contest: Json | null;
          yellow_card: Json | null;
        };
        Insert: {
          ball_recovery?: Json | null;
          effective_clearance?: Json | null;
          goal_assist?: Json | null;
          goals?: Json | null;
          goals_conceded?: Json | null;
          isInIdealFormation?: boolean | null;
          marca_points?: Json | null;
          mins_played?: Json | null;
          offtarget_att_assist?: Json | null;
          own_goals?: Json | null;
          pen_area_entries?: Json | null;
          penalty_conceded?: Json | null;
          penalty_failed?: Json | null;
          penalty_save?: Json | null;
          penalty_won?: Json | null;
          playerID: number;
          poss_lost_all?: Json | null;
          red_card?: Json | null;
          saves?: Json | null;
          second_yellow_card?: Json | null;
          total_scoring_att?: Json | null;
          totalPoints?: number | null;
          week: number;
          won_contest?: Json | null;
          yellow_card?: Json | null;
        };
        Update: {
          ball_recovery?: Json | null;
          effective_clearance?: Json | null;
          goal_assist?: Json | null;
          goals?: Json | null;
          goals_conceded?: Json | null;
          isInIdealFormation?: boolean | null;
          marca_points?: Json | null;
          mins_played?: Json | null;
          offtarget_att_assist?: Json | null;
          own_goals?: Json | null;
          pen_area_entries?: Json | null;
          penalty_conceded?: Json | null;
          penalty_failed?: Json | null;
          penalty_save?: Json | null;
          penalty_won?: Json | null;
          playerID?: number;
          poss_lost_all?: Json | null;
          red_card?: Json | null;
          saves?: Json | null;
          second_yellow_card?: Json | null;
          total_scoring_att?: Json | null;
          totalPoints?: number | null;
          week?: number;
          won_contest?: Json | null;
          yellow_card?: Json | null;
        };
        Relationships: [];
      };
      teams: {
        Row: {
          image: string | null;
          name: string | null;
          nickname: string | null;
          teamID: number;
          stadium: string | null;
        };
        Insert: {
          image?: string | null;
          name?: string | null;
          nickname?: string | null;
          teamID: number;
          stadium?: string | null;
        };
        Update: {
          image?: string | null;
          name?: string | null;
          nickname?: string | null;
          teamID?: number;
          stadium?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
