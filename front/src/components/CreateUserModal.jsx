import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BASE_URL } from "../App";
import { useState } from "react";
import { Formik, Form, Field } from "formik";

const CreateUserModal = ({ setUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleCreateUser = async (values, actions) => {
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + "/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      toast({
        status: "success",
        title: "Yihoo!",
        description: "Friend created successfully.",
        duration: 2000,
        position: "top-center",
      });

      setUsers((prevUsers) => [...prevUsers, data]);
      onClose();
      actions.resetForm();
    } catch (error) {
      toast({
        status: "error",
        title: "An error occurred",
        description: error.message,
        position: "top-center",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Leave your card</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create User</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              name: "",
              role: "",
              description: "",
              gender: "",
            }}
            onSubmit={handleCreateUser}
          >
            {({ values, handleChange, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <ModalBody>
                  <FormControl>
                    <FormLabel>Full name</FormLabel>
                    <Field
                      as={Input}
                      name='name'
                      placeholder='Name'
                      value={values.name}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Role</FormLabel>
                    <Field
                      as={Input}
                      name='role'
                      placeholder='Position'
                      value={values.role}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Field
                      as={Textarea}
                      name='description'
                      placeholder='Description'
                      value={values.description}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                      name='gender'
                      value={values.gender}
                      onChange={handleChange}
                    >
                      <Field as={Radio} name='gender' value='male' mr={3}>
                        Male
                      </Field>
                      <Field as={Radio} name='gender' value='female'>
                        Female
                      </Field>
                    </RadioGroup>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme='blue'
                    type='submit'
                    isLoading={isSubmitting}
                  >
                    Create User
                  </Button>
                  <Button onClick={onClose} ml={3}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateUserModal;
