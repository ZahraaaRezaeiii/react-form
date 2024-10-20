import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormFields } from './FormFields';

export const FormProvider= () => {
    const validationSchema = Yup.object().shape({
        customerName: Yup.string().required('Customer name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        orderDate: Yup.date().required('Order date is required').nullable(),
        product: Yup.string().required('Product is required'),
        subscribe: Yup.boolean().oneOf([true], 'You must accept the terms'),
        paymentMethod: Yup.string().required('Payment method is required'),
        notifications: Yup.boolean(),
        quantity: Yup.number().required('Quantity is required').min(1, 'Minimum quantity is 1'),
        tags: Yup.array().min(1, 'Select at least one tag'),
        selectedItems: Yup.array().min(1, 'Select at least one item'),
    });

    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
        customerName: '',
        email: '',
        orderDate: '',
        product: '',
        subscribe: false,
        paymentMethod: '',
        notifications: false,
        quantity: 1,
        tags: [],
        selectedItems: [],
        },
    });

    const formWatch = watch();

    return (
        <FormFields control={control} errors={errors} handleSubmit={handleSubmit} formWatch={formWatch} reset={reset}></FormFields>
    );

};