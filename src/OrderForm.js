import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Typography,
  Container,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Switch,
  Slider,
  Autocomplete,
  Chip,
  Box,
} from '@mui/material';

const OrderForm = () => {
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

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  const tagOptions = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'];
  const itemOptions = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          bgcolor: '#f7f7f7',
          p: 4,
          borderRadius: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, color: '#333' }}>
          Order Form
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 3 }}>
            <Controller
              name="customerName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Customer Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.customerName}
                  helperText={errors.customerName?.message}
                  margin="normal"
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  margin="normal"
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Controller
              name="orderDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Order Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  error={!!errors.orderDate}
                  helperText={errors.orderDate?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Controller
              name="product"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  displayEmpty
                  error={!!errors.product}
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="">Select Product</MenuItem>
                  <MenuItem value="product1">Product 1</MenuItem>
                  <MenuItem value="product2">Product 2</MenuItem>
                  <MenuItem value="product3">Product 3</MenuItem>
                </Select>
              )}
            />
            {errors.product && <Typography color="error">{errors.product.message}</Typography>}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Controller
              name="subscribe"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="I accept the terms and conditions"
                />
              )}
            />
            {errors.subscribe && <Typography color="error">{errors.subscribe.message}</Typography>}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel value="credit" control={<Radio />} label="Credit Card" />
                  <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                  <FormControlLabel value="bitcoin" control={<Radio />} label="Bitcoin" />
                </RadioGroup>
              )}
            />
            {errors.paymentMethod && (
              <Typography color="error">{errors.paymentMethod.message}</Typography>
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Controller
              name="notifications"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch {...field} />}
                  label="Receive Notifications"
                />
              )}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Quantity</Typography>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <Slider
                  {...field}
                  defaultValue={1}
                  min={1}
                  max={100}
                  step={1}
                  marks
                  valueLabelDisplay="auto"
                  sx={{ color: 'primary.main' }}
                />
              )}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  multiple
                  fullWidth
                  displayEmpty
                  error={!!errors.tags}
                  sx={{ mb: 2 }}
                  renderValue={(selected) =>
                    selected.length === 0 ? 'Select Tags' : selected.join(', ')
                  }
                >
                  {tagOptions.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      <Checkbox checked={field.value.indexOf(tag) > -1} />
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.tags && <Typography color="error">{errors.tags.message}</Typography>}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Controller
              name="selectedItems"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  options={itemOptions}
                  onChange={(event, value) => field.onChange(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Items"
                      variant="outlined"
                      error={!!errors.selectedItems}
                      helperText={errors.selectedItems?.message}
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip key={option} label={option} {...getTagProps({ index })} />
                    ))
                  }
                />
              )}
            />
            {errors.selectedItems && (
              <Typography color="error">{errors.selectedItems.message}</Typography>
            )}
          </Box>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default OrderForm;
