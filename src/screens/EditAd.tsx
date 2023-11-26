import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';   
import { ScrollView, VStack, HStack, Text, Center, Heading, Image, Radio, Switch, Checkbox } from 'native-base';
import IconLeft from '@assets/left.png';  
import { useNavigation, useRoute } from '@react-navigation/native';         
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import Carousel from 'react-native-reanimated-carousel';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

type RouteParams = {
  title: string;
  description: string;
  price: string;
  images: any[];
  paymentMethods: string[];
  isNew: boolean;
  acceptTrade: boolean;
  id: string;
};

export function EditAd(){
  
  const route = useRoute();

  const {
    title:preTitle,
    description:preDescription,
    price:prePrice,
    images: preImages,
    paymentMethods: prePaymentMethods,
    isNew: preIsNew,
    acceptTrade: preAcceptTrade,
    id
  } = route.params as RouteParams;

  const [title, setTitle] = useState<string>(preTitle);
  const [description, setDescription] = useState<string>(preDescription);
  const [price, setPrice] = useState<string>(prePrice);
  const [isNew, setIsNew] = useState<boolean>(preIsNew);
  const [paymentMethods, setPaymentMethods] = useState<string[]>(prePaymentMethods);
  const [acceptTrade, setAcceptTrade] = useState<boolean>(preAcceptTrade);
  const [images, setImages] = useState<any[]>(preImages);  

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  function handleGoBack() {
    navigation.navigate('myads' );
  };

  return(
  <ScrollView>

    <VStack 
      p={6}
      mt={6}
    >



      <TouchableOpacity
        onPress={handleGoBack}
      >

        <Image 
          source={IconLeft}
          alt='Back'
        />

      </TouchableOpacity>


      <Center
        mt={-6}
      >
        <Heading 
          color='gray.200' 
          fontSize={22} 
          fontFamily='heading'
        >Editar Anúncio
        </Heading>  
      </Center>  


      <Text
        fontSize={20} 
        mt={6}
      >
        Imagens
      </Text>

      <Text
        fontSize={16} 
        color='gray.400' 
      >
        Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
      </Text>

      <HStack my={5}>
            {images.length > 0 &&
              images.map((imageData) => (
                <Image
                  w={88}
                  h={88}
                  mr={2}
                  source={{
                    uri: `${api.defaults.baseURL}/images/${imageData.path}`,
                  }}
                  alt="Imagem do novo anúncio"
                  resizeMode="cover"
                  borderRadius={8}
                  key={imageData.path}
                />
              ))}

            {images.length < 3 && (
              <Button
                bg="gray.500"
                w={88}
                h={88}
                ml={2}
                _pressed={{
                  borderWidth: 1,
                  bg: "gray.500",
                  borderColor: "gray.400",
                }}
                // onPress={handleAdPhotoSelect}
              >
                
              </Button>
            )}
          </HStack>

          <Heading color="gray.200" fontSize={18} my={2}>
            Sobre o produto
          </Heading>

          <Input 
            placeholder='Título do anúncio'
            onChangeText={setTitle}
            value={title}
          />

          <Input 
            placeholder='Descrição do produto'
            multiline={true}
            numberOfLines={5}
            mt={6}
            onChangeText={setDescription}
            value={description}
          />

          <Radio.Group
            name="productCondition"
            value={isNew ? "new" : "used"}
            onChange={(nextValue) => {
              setIsNew(nextValue === "new" ? true : false);
            }}
          >
            <HStack>
              <Radio value="new" my="2" size="sm">
                <Text color="gray.200" fontSize={14}>
                  Produto novo
                </Text>
              </Radio>
              <Radio value="used" my="2" ml={5} size="sm">
                <Text color="gray.200" fontSize={14}>
                  Produto usado
                </Text>
              </Radio>
            </HStack>

          </Radio.Group>

          <Heading color="gray.200" fontSize={16} mb={2} mt={5}>
            Venda
          </Heading>

          <Input 
            placeholder='            Valor do produto'
            onChangeText={setPrice}
            value={price}
          />

          <Heading color="gray.200" fontSize={16} my={2}>
            Aceita troca?
          </Heading>

          <Switch
            onToggle={(value) => setAcceptTrade(value)}
            value={acceptTrade}
            size={12}
            m={0}
          />

          <Heading color="gray.200" fontSize={16} my={2}>
            Meios de pagamento
          </Heading>

          <Checkbox.Group onChange={setPaymentMethods} value={paymentMethods}>
            <Checkbox value="boleto">
              <Text color="gray.300" fontSize={16}>
                Boleto
              </Text>
            </Checkbox>
            <Checkbox value="pix">
              <Text color="gray.300" fontSize={16}>
                Pix
              </Text>
            </Checkbox>
            <Checkbox value="cash">
              <Text color="gray.300" fontSize={16}>
                Dinheiro
              </Text>
            </Checkbox>
            <Checkbox value="card">
              <Text color="gray.300" fontSize={16}>
                Cartão de Crédito
              </Text>
            </Checkbox>
            <Checkbox value="deposit">
              <Text color="gray.300" fontSize={16}>
                Depósito Bancário
              </Text>
            </Checkbox>
          </Checkbox.Group>

          <Text>
            test{paymentMethods}
            </Text>  

            <HStack
        mt={6}
      >

        <Button 
            title='Cancelar'
            w={130}
            onPress={handleGoBack}
        />

        <Button 
            title='Avançar'
            w={130}
            variant='outline'
            ml={12}
            // onPress={handleNewPreview}
        />

      </HStack>              

    </VStack>

  </ScrollView>
  )
}