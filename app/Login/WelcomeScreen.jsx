import { useRouter } from 'expo-router';
import { View, Text, Image, Pressable } from 'react-native';
import Colors from '@/constants/Colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={{ backgroundColor: Colors.WHITE, height: '100%' }}>
      <Image
        source={require('./../../assets/images/LoginImageBackground.webp')}
        style={{ width: '100%', height: 500 }}
      />
      <View style={{ padding: 35, display: 'flex', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'outfit-Bold', fontSize: 30, textAlign: 'center' }}>
          Protect and unlock your images with ease
        </Text>

        <Text style={{ fontFamily: 'outfit', textAlign: 'center', padding: 15, fontSize: 18, color: Colors.GRAY }}>
          Secure your photos and keep your memories safe!
        </Text>

        <Pressable
          onPress={() => router.push('/Login/LoginPage')}
          style={{
            padding: 15,
            marginTop: 70,
            backgroundColor: Colors.PRIMARY,
            width: '100%',
            borderRadius: 14,
          }}
        >
          <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, textAlign: 'center', color: "#fff" }}>
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
