type User = {
    email: string;
    password: string;
  };
  
  const mockUser: User = {
    email: "admin@example.com",
    password: "password123",
  };
  
  export const authenticate = (email: string, password: string): boolean => {
    return email === mockUser.email && password === mockUser.password;
  };
  