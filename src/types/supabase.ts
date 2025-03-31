export interface Database {
    public: {
      Tables: {
        donations: {
          Row: {
            id: string;
            name: string;
            email: string;
            amount: number;
            pan: string;
            status: string;
            created_at: string;
          };
          Insert: {
            id?: string;
            name: string;
            email: string;
            amount: number;
            pan: string;
            status?: string;
            created_at?: string;
          };
          Update: {
            id?: string;
            name?: string;
            email?: string;
            amount?: number;
            pan?: string;
            status?: string;
            created_at?: string;
          };
        };
        events: {
          Row: {
            id: string;
            title: string;
            date: string;
            time: string;
            location: string;
            image: string;
            description: string;
            created_at: string;
          };
          Insert: {
            id?: string;
            title: string;
            date: string;
            time: string;
            location: string;
            image: string;
            description: string;
            created_at?: string;
          };
          Update: {
            id?: string;
            title?: string;
            date?: string;
            time?: string;
            location?: string;
            image?: string;
            description?: string;
            created_at?: string;
          };
        };
        gallery: {
          Row: {
            id: string;
            url: string;
            caption: string;
            created_at: string;
          };
          Insert: {
            id?: string;
            url: string;
            caption: string;
            created_at?: string;
          };
          Update: {
            id?: string;
            url?: string;
            caption?: string;
            created_at?: string;
          };
        };
        volunteers: {
          Row: {
            id: string;
            name: string;
            email: string;
            phone: string;
            interest: string;
            message: string;
            created_at: string;
          };
          Insert: {
            id?: string;
            name: string;
            email: string;
            phone: string;
            interest: string;
            message: string;
            created_at?: string;
          };
          Update: {
            id?: string;
            name?: string;
            email?: string;
            phone?: string;
            interest?: string;
            message?: string;
            created_at?: string;
          };
        };
        testimonials: {
          Row: {
            id: string;
            name: string;
            role: string;
            image: string;
            quote: string;
            created_at: string;
          };
          Insert: {
            id?: string;
            name: string;
            role: string;
            image: string;
            quote: string;
            created_at?: string;
          };
          Update: {
            id?: string;
            name?: string;
            role?: string;
            image?: string;
            quote?: string;
            created_at?: string;
          };
        };
      };
    };
  }