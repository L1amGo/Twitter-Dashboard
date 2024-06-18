import { styled } from '@mui/system';
import { Container, TextField, Button, Box, Typography, Paper, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
}));

export const StyledBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(1),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginTop: theme.spacing(4),
}));

export const StyledCircularProgress = styled(CircularProgress)({
    color: 'white',
});

export {
    Container,
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
};
