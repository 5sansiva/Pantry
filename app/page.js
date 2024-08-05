"use client"

import Image from 'next/image'
import {Box, Stack, Typography, Modal, TextField, Button} from '@mui/material';
import {firestore} from '../firebase';
import { collection, query, deleteDoc, doc, getDocs, getDoc, setDoc} from 'firebase/firestore';
import { useEffect, useState } from 'react';



export default function Home() {
  const [pantry, setPantry] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) =>{
      pantryList.push({
        name: doc.id,
        ...doc.data(),

      })
    })
    setPantry(pantryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
        await setDoc(docRef, {quantity: quantity + 1})
      
    }
    else{
      await setDoc(docRef, {quantity: 1})
    }

    await updatePantry()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if (quantity == 1)
      {
        await deleteDoc(docRef)
      }
      else{
        await setDoc(docRef, {quantity: quantity -1})
      }
    }

    await updatePantry()
  }

  useEffect(()=>{
    updatePantry()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  
  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" alignItems="center" gap={2} p={2}>
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          color="black"
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField 
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              label="Item Name"
              variant="outlined"
            />
            <Button 
              variant="outlined" 
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      
       <Box width="800px" bgcolor="white" border="1px solid white" p={2}>
        <Typography variant="h2" bgcolor="#ADD8E6" align="center">Inventory Items</Typography>
        <Box bgcolor="white">
          {pantry.map((item) => (
            <Box key={item.name} display="flex" justifyContent="space-between" p={1} borderBottom="1px solid #ccc">
              <Typography>{item.name}</Typography>
              <Typography>{item.quantity}</Typography>

              <Button variant="outlined" onClick={() => addItem(item.name)}>Add</Button>
              <Button variant="outlined" onClick={() => removeItem(item.name)}>Remove</Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
