import { useState, useEffect } from 'react'
import { Button, Center, Input, Modal, Text } from 'native-base'

type Props = {
  name: string
  modalState: {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  }
  // inputState: {
  //   value: string;
  //   setValue: React.Dispatch<React.SetStateAction<string>>;
  // };
  confirmFunc: (value: string) => Promise<void>
}

export const ChangeNameModal = ({
  name,
  modalState,
  // inputState,
  confirmFunc,
}: Props) => {
  const { showModal, setShowModal } = modalState
  // const { value, setValue } = inputState;
  const [value, setValue] = useState(name)

  // useEffect(() => {
  //   setValue(name);
  // }, [name]);

  return (
    <Modal isOpen={showModal}>
      <Modal.Content maxWidth="400px">
        <Modal.Body>
          <Text>{value}</Text>
          <Center h={16}>
            <Input
              w="100%"
              value={value}
              onChangeText={(value) => setValue(value)}
            />
          </Center>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => setShowModal(false)}
            >
              キャンセル
            </Button>
            <Button
              bg="green.500"
              _pressed={{ backgroundColor: 'green.500' }}
              onPress={() => confirmFunc(value)}
            >
              変更
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
