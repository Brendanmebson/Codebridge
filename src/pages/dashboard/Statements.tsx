import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  useTheme,
  Divider,
  CircularProgress,
} from '@mui/material';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../config/supabase';
import type { SavingsAccount, Loan, SavingsTransaction } from '../../types';

const Statements: React.FC = () => {
  const theme = useTheme();
  const { palette, shape } = theme;
  const br = shape.borderRadius as number;
  const { member } = useAuth();

  const [loading, setLoading] = useState(true);
  const [savingsAccounts, setSavingsAccounts] = useState<SavingsAccount[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [transactions, setTransactions] = useState<SavingsTransaction[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const [savingsRes, loansRes, txRes] = await Promise.all([
          supabase.from('savings_accounts').select('*').eq('member_id', member?.id ?? ''),
          supabase.from('loans').select('*').eq('member_id', member?.id ?? ''),
          supabase.from('savings_transactions').select('*').eq('created_by', member?.id ?? ''),
        ]);

        if (savingsRes.error) throw savingsRes.error;
        if (loansRes.error) throw loansRes.error;
        if (txRes.error) throw txRes.error;

        setSavingsAccounts(savingsRes.data || []);
        setLoans(loansRes.data || []);
        setTransactions(txRes.data || []);
      } catch (error) {
        console.error('Failed to load statements:', error);
      } finally {
        setLoading(false);
      }
    };

    if (member?.id) {
      void load();
    }
  }, [member?.id]);

  const fmt = (n: number) => '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 2 });

  if (loading) {
    return (
      <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Statements & Account History
      </Typography>

      <Stack spacing={3}>
        <Card sx={{ borderRadius: `${br * 2}px` }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Savings Snapshot
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {savingsAccounts.length === 0 ? (
              <Typography variant="body2" sx={{ color: palette.text.secondary }}>
                No savings accounts found yet.
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                {savingsAccounts.map((account) => (
                  <Box key={account.id} sx={{ display: 'flex', justifyContent: 'space-between', gap: 3, flexWrap: 'wrap' }}>
                    <Typography>{account.account_type || 'Regular'} account</Typography>
                    <Typography sx={{ fontWeight: 700 }}>{fmt(Number(account.balance || 0))}</Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: `${br * 2}px` }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Loan Overview
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {loans.length === 0 ? (
              <Typography variant="body2" sx={{ color: palette.text.secondary }}>
                No loan records found yet.
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                {loans.map((loan) => (
                  <Box key={loan.id} sx={{ display: 'flex', justifyContent: 'space-between', gap: 3, flexWrap: 'wrap' }}>
                    <Typography>{loan.loan_type} loan</Typography>
                    <Typography sx={{ fontWeight: 700 }}>{loan.status}</Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: `${br * 2}px` }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Recent Transactions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {transactions.length === 0 ? (
              <Typography variant="body2" sx={{ color: palette.text.secondary }}>
                No transaction history yet.
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                {transactions.map((txn) => (
                  <Box key={txn.id} sx={{ display: 'flex', justifyContent: 'space-between', gap: 3, flexWrap: 'wrap' }}>
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>{txn.transaction_type}</Typography>
                      <Typography variant="body2" sx={{ color: palette.text.secondary }}>{txn.description || 'No description'}</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 700 }}>{fmt(Number(txn.amount || 0))}</Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default Statements;
