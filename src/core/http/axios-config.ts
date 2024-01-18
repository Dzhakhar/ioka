import axios, { AxiosRequestConfig } from 'axios';

const http = axios.create();

http.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (config.headers) {
            config.headers['API-KEY'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE3OTUzNTE5NjQsImlhdCI6MTY3ODQyNjcwNywiYXpwIjoiZGFzaGJvYXJkIiwiaXNzIjoiZ2FybWl1cyIsInN1YiI6InVzcl85TEk4MFQ3VkdQIiwiYXVkIjpbImdhcm1pdXMiLCJ0cmFuc2ZlciIsInRva2VuaXplciIsImN1c3RvbWVyIiwibWFzdGVycGFzcyIsInBheW91dHMiLCJjb3JlIiwiYWNjb3VudCJdLCJyZXNvdXJjZV9hY2Nlc3MiOnsiZ2FybWl1cyI6eyJyb2xlcyI6WyJzaG9wcy5zdWI6d3JpdGUiXX0sInRyYW5zZmVyIjp7InJvbGVzIjpbInRyYW5zZmVyLW9yZGVyczp3cml0ZSIsInRyYW5zZmVyLW9yZGVyczpyZWFkIiwiY29ycC1jYXJkczp3cml0ZSIsImNvcnAtY2FyZHM6cmVhZCJdfSwidG9rZW5pemVyIjp7InJvbGVzIjpbInBheW1lbnQtbWV0aG9kczp3cml0ZSJdfSwiY3VzdG9tZXIiOnsicm9sZXMiOlsiY3VzdG9tZXJzOndyaXRlIiwiY3VzdG9tZXJzOnJlYWQiLCJjdXN0b21lcnMuKi5jYXJkczp3cml0ZSIsImN1c3RvbWVycy4qLmNhcmRzOnJlYWQiXX0sIm1hc3RlcnBhc3MiOnsicm9sZXMiOlsibWFzdGVycGFzcy5jYXJkczpyZW1vdmUiLCJtYXN0ZXJwYXNzLmNhcmRzOnJlYWQiLCJtYXN0ZXJwYXNzLnNlc3Npb25zOndyaXRlIiwibWFzdGVycGFzcy5zZXNzaW9uczpyZWFkIiwibWFzdGVycGFzcy5waG9uZXM6d3JpdGUiLCJtYXN0ZXJwYXNzLmNhcmRzOndyaXRlIl19LCJwYXlvdXRzIjp7InJvbGVzIjpbInBheW91dC1vcmRlcnM6d3JpdGUiLCJwYXlvdXQtb3JkZXJzOnJlYWQiLCJyZWNlaXZlcnM6cmVhZCIsInJlY2VpdmVyczp3cml0ZSIsInBheW91dC13ZWJob29rczp3cml0ZSIsInBheW91dC13ZWJob29rczpyZWFkIl19LCJjb3JlIjp7InJvbGVzIjpbIm9yZGVyczp3cml0ZSIsIm9yZGVyczpyZWFkIiwib3JkZXJzLioucGF5bWVudHM6d3JpdGUiLCJvcmRlcnMuKi5wYXltZW50czpyZWFkIiwib3JkZXJzLioucGF5bWVudHMuKi5yZWZ1bmRzOndyaXRlIiwib3JkZXJzLioucGF5bWVudHMuKi5yZWZ1bmRzOnJlYWQiLCJ3ZWJob29rczp3cml0ZSIsIndlYmhvb2tzOnJlYWQiLCJzdWJzY3JpcHRpb25zOndyaXRlIiwic3Vic2NyaXB0aW9uczpyZWFkIiwic3Vic2NyaXB0aW9ucy4qLm9yZGVycy4qLnBheW1lbnRzOndyaXRlIiwic3Vic2NyaXB0aW9ucy4qLm9yZGVycy4qLnBheW1lbnRzOnJlYWQiLCJzcGxpdHM6d3JpdGUiLCJzcGxpdHM6cmVhZCIsInBheW1lbnQtbGlua3M6cmVhZCIsInBheW1lbnQtbGlua3M6d3JpdGUiLCJjaGVja3M6cmVhZCIsImNoZWNrczp3cml0ZSJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJ3YWxsZXRzOnJlYWQiLCJ3YWxsZXRzOndyaXRlIiwid2FsbGV0czpyZW1vdmUiLCJ3YWxsZXRzLmFjY291bnQ6cmVhZCIsIndhbGxldHMuZXZlbnRzOnJlYWQiLCJ3YWxsZXRzLnRyYW5zYWN0aW9uczpyZWFkIiwid2FsbGV0cy50cmFuc2FjdGlvbnM6d3JpdGUiLCJ3YWxsZXRzLnRyYW5zYWN0aW9uczpyZW1vdmUiLCJ3YWxsZXRzLncydzp3cml0ZSIsIndhbGxldHMudzJ3OnJlYWQiLCJ3YWxsZXRzLndlYmhvb2tzOndyaXRlIiwid2FsbGV0cy53ZWJob29rczpyZWFkIiwid2FsbGV0cy53ZWJob29rczpyZW1vdmUiLCJhY2NvdW50czpyZWFkIiwiZGVwb3NpdHM6cmVhZCIsIndpdGhkcmF3YWxzOnJlYWQiLCJyZXNvdXJjZXM6cmVhZCIsInRyYW5zZmVyczpyZWFkIiwiZGVwb3NpdHM6d3JpdGUiXX19LCJ1c2VyIjp7ImlkIjoidXNyXzlMSTgwVDdWR1AiLCJkaXNwbGF5X25hbWUiOiJQeXRob24gaW9rYSIsInVzZXJuYW1lIjoicHl0aG9uQGlva2Eua3oiLCJmaXJzdF9uYW1lIjoiUHl0aG9uIiwiaXNfc3VwZXJ1c2VyIjpmYWxzZSwibGFzdF9uYW1lIjoiaW9rYSIsImVtYWlsIjoicHl0aG9uQGlva2Eua3oiLCJzdGF0dXMiOiJBQ1RJVkUifSwic2hvcCI6eyJpZCI6InNocF9VWU5CRlZMTlFKIiwib3duZXJfaWQiOiJ1c3JfOUxJODBUN1ZHUCIsImlzX2RlYWxlciI6ZmFsc2UsImJpbiI6IjEyMzQ1Njc4OTAiLCJkaXNwbGF5X25hbWUiOiJweXRob24uc3RhZ2Uuc2hvcCIsInN0YXR1cyI6IkFDQ0VQVEVEIiwic3ViIjpbXX0sImxvY2FsZSI6InJ1In0.XYRts_RJu0H3biiFVydTGTmXiuhFCunlffKYNeJ1GfeNp4lRtLzfCf-Ztrs3Hb6tFg3OAs55voQql9NB7ZkIprq1bOmrrxbMMuLEaZYab_xq4_MC7QD-x9w7xKdmQjFjCowbIi4KbVPjKiYoviKXNh9jLe65_HdPxG6OmmIMF-wUJHc8-Lt346i8MoXTgoojF7_v3v3JPs8LKoYrewIJGWn2YnYezmWAK6ePgGkTWvDFmreMHnjReM-EoG8hvEzsjwPOr4DoiEI63w_vFs0XeV72wi8-BVuGNRDVFSHmkt14dw_WkkxxGEM9YqUEYtuqU4wKBMTTh3ITuXOuS2naIg';
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default http;