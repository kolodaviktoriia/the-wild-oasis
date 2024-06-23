import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useNavigate, useParams } from 'react-router-dom';
import { useBooking } from './useBooking';
import Spinner from '../../ui/Spinner';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiArrowUpOnSquareStack,
  HiTrash,
} from 'react-icons/hi2';
import { useCheckout } from '../check-in-out/useCheckout';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from './useDeleteBooking';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  const { status, id } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${id}`)}
          >
            Check in
          </Button>
        )}
        {status === 'checked-in' && (
          <Button
            icon={<HiArrowUpOnSquareStack />}
            onClick={() => checkout(id)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens='delete'>
            <Button icon={<HiTrash />} variation='danger'>
              Delete booking
            </Button>
          </Modal.Open>
          <Modal.Window name='delete'>
            <ConfirmDelete
              resourceName='booking'
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(id, { onSettled: () => navigate(-1) })
              }
            />
          </Modal.Window>
        </Modal>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
