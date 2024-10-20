import React from 'react';
import { Controller } from 'react-hook-form';
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
  Grid,
  Box,
} from '@mui/material';

export const FormFields = ({ control, errors, handleSubmit, formWatch }) => {
  const tagOptions = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'];
  const itemOptions = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    };

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
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
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
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="product"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                    displayEmpty
                    error={!!errors.product}
                  >
                    <MenuItem value="">Select Product</MenuItem>
                    <MenuItem value="product1">Product 1</MenuItem>
                    <MenuItem value="product2">Product 2</MenuItem>
                    <MenuItem value="product3">Product 3</MenuItem>
                  </Select>
                )}
              />
              {errors.product && <Typography color="error">{errors.product.message}</Typography>}
            </Grid>

            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
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
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Button type="submit" variant="contained" color="primary" size="large">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="h6" gutterBottom align="center" sx={{ mt: 4 }}>
          Form Values (Real-Time Watch):
        </Typography>
        <Typography variant="body1">Customer Name: {formWatch.customerName}</Typography>
        <Typography variant="body1">Email: {formWatch.email}</Typography>
        <Typography variant="body1">Order Date: {formWatch.orderDate}</Typography>
        <Typography variant="body1">Product: {formWatch.product}</Typography>
        <Typography variant="body1">Subscribe: {formWatch.subscribe ? 'Yes' : 'No'}</Typography>
        <Typography variant="body1">Payment Method: {formWatch.paymentMethod}</Typography>
        <Typography variant="body1">Notifications: {formWatch.notifications ? 'Yes' : 'No'}</Typography>
        <Typography variant="body1">Quantity: {formWatch.quantity}</Typography>
        <Typography variant="body1">Tags: {formWatch.tags.join(', ')}</Typography>
        <Typography variant="body1">Selected Items: {formWatch.selectedItems.join(', ')}</Typography>
      </Box>
    </Container>
  );
};

