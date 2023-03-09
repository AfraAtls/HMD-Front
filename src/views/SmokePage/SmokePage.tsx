import { Alert, Box, Button, TextField } from '@mui/material';
import { Container } from '@mui/system';
import MessageBox from '../../shared/MessageBox/MessageBox';
import 'dayjs/locale/fr';
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  resetInputs,
  selectSmokeDate,
  selectSmokeMessage,
  selectSmokeQuantity,
  setSelectedSmoke,
  setSmokeDate,
  setSmokeQuantity,
} from '../../reducers/dashboard/smoke/smokeSlice';
import { deleteSmoke, editSmoke, postSmoke } from '../../reducers/dashboard/smoke/smokeMiddleware';
import { selectSmokes } from '../../reducers/user/userSlice';
import CustomTable from '../../shared/CustomTable/CustomTable';
import { selectIsEdit } from '../../reducers/UI/uiSlice';
import { useRef } from 'react';

export default function SmokePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const smokeInputAmount = useAppSelector(selectSmokeQuantity);
  const smokeDate = useAppSelector(selectSmokeDate);
  const smokes = useAppSelector(selectSmokes);
  const isEdit = useAppSelector(selectIsEdit);
  const message = useAppSelector(selectSmokeMessage);
  const formRef = useRef(null);
  console.log(message);
  return (
    <Container sx={{ mt: 2 }}>
      <MessageBox
        title="Comment réduire sa consommation de cigarettes ?"
        content="Si vous cherchez à réduire votre consommation de cigarettes, voici quelques conseils utiles. Tout d'abord, établissez un plan et fixez-vous des objectifs réalisables pour réduire progressivement le nombre de cigarettes que vous fumez chaque jour. Essayez de vous rappeler les raisons pour lesquelles vous voulez arrêter de fumer ou réduire votre consommation et gardez ces raisons en tête. Évitez les déclencheurs qui vous incitent à fumer, comme le café ou l'alcool. Essayez également de remplacer la cigarette par des alternatives plus saines, comme des bonbons à la menthe ou des bâtons de cannelle. Enfin, n'hésitez pas à demander de l'aide et du soutien à votre entourage ou à un professionnel de la santé. Avec de la patience et de la persévérance, vous pouvez réussir à réduire votre consommation de cigarettes et à améliorer votre santé."
      />
      {smokes.length > 0 && (
        <CustomTable
          array={smokes}
          onSelect={setSelectedSmoke}
          onDelete={deleteSmoke}
          resetInput={resetInputs}
          formRef={formRef}
        />
      )}
      <Box
        component="form"
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
          console.log('smoke submit');
          isEdit ? dispatch(editSmoke()) : dispatch(postSmoke());
        }}
        sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}
      >
        {message.message && <Alert severity={message.severity}>{message.message}</Alert>}
        <TextField
          onChange={(event) => dispatch(setSmokeQuantity(Number(event.target.value)))}
          value={smokeInputAmount}
          label="Quantité de cigarettes"
          type="number"
          variant="outlined"
          sx={{ mb: 1, mt: 1 }}
        />
        <CustomDatePicker
          value={smokeDate}
          actionCreator={setSmokeDate}
        />
        <Button
          sx={{ mx: 'auto', my: 2 }}
          variant="contained"
          type="submit"
        >
          Valider
        </Button>
      </Box>
    </Container>
  );
}
