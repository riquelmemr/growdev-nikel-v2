import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControlLabel,
	Grid,
	InputAdornment,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { hideModal } from '../../store/modules/ModalTransaction';

interface ModalTransactionProps {
	contexto: 'create' | 'update' | 'delete';
}

export const ModalTransaction: React.FC<ModalTransactionProps> = ({
	contexto,
}) => {
	const select = useAppSelector((state) => state.modal);
	const dispatch = useAppDispatch();

	return (
		<Dialog
			open={select.open}
			onClose={() => dispatch(hideModal())}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{contexto === 'create' && 'Criar Transação'}
				{contexto === 'update' && 'Editar Transação'}
				{contexto === 'delete' && 'Deletar Transação'}
			</DialogTitle>
			<DialogContent>
				{contexto !== 'delete' && (
					<Grid container spacing={3} marginTop={1}>
						<Grid item xs={12}>
							<TextField
								label="Valor"
								type="number"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											R$
										</InputAdornment>
									),
								}}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Descrição"
								type="text"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								InputLabelProps={{
									shrink: true,
								}}
								label="Data"
								type="date"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<RadioGroup
								row
								aria-labelledby="demo-row-radio-buttons-group-label"
								name="row-radio-buttons-group"
							>
								<FormControlLabel
									value="income"
									control={<Radio />}
									checked
									label="Entrada"
								/>
								<FormControlLabel
									value="outcome"
									control={<Radio />}
									label="Saída"
								/>
							</RadioGroup>
						</Grid>
					</Grid>
				)}

				{contexto === 'delete' && (
					<DialogContentText id="alert-dialog-description">
						Tem certeza que deseja remover a transação, essa ação é
						irreversível
					</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Button
					variant="outlined"
					onClick={() => dispatch(hideModal())}
				>
					Cancelar
				</Button>
				<Button
					variant="contained"
					onClick={() => alert('concluido')}
					autoFocus
				>
					Concluir
				</Button>
			</DialogActions>
		</Dialog>
	);
};
