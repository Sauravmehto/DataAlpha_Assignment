import { useQuery } from '@tanstack/react-query';

const fetchLoanData = async () => {
  const response = await fetch('https://raw.githubusercontent.com/rahulsoni-data/data/refs/heads/main/data.json');
  
  if (!response.ok) {
    throw new Error('Failed to fetch loan data');
  }
  
  return response.json();
};

export const useLoanData = () => {
  return useQuery({
    queryKey: ['loanData'],
    queryFn: fetchLoanData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};
