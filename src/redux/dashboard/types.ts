interface DashboardProps {
  usersCount: number;
}

export interface DashboardInitialState {
  data: DashboardProps[] | null;
  loading: boolean;
  error: unknown | string | null;
}
