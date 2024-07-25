import NextLink from 'next/link';
import {
    Link,
    Container,
    Heading,
    Box,
    Flex,
    Icon,
    Button,
    List,
    ListItem,
    SimpleGrid,
    useColorModeValue
} from '@chakra-ui/react';
import { WorkGridItem } from '../components/grid-item'
import { ChevronRightIcon, EmailIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import Layout from '../components/layouts/article';
import Section from '../components/section';
import Paragraph from '../components/paragraph';
import { FaAndroid, FaApple, FaTelegramPlane } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import Footer from '../components/footer';
import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import winner_page from '../public/images/winner_page.png'

const Page = () => {
    const [downloadCount, setDownloadCount] = useState(0);
    const [_loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchDownloadCount = async () => {
            try {
                const downloadDoc = await getDoc(doc(db, 'downloads', 'pAd9UmdalQuAcEeuXQm4'));
                if (downloadDoc.exists()) {
                    setDownloadCount(downloadDoc.data().downloadCount);
                } else {
                    console.log('Document does not exist');
                }
            } catch (error) {
                console.error('Error fetching download count: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDownloadCount();
    }, []);

    const handleDownload = async () => {
        try {
            await fetch('/api/incrementDownload', {
                method: 'POST'
            });

            // Rafraîchir le compteur après l'incrémentation réussie
            const downloadDoc = await getDoc(doc(db, 'downloads', 'pAd9UmdalQuAcEeuXQm4'));
            if (downloadDoc.exists()) {
                setDownloadCount(downloadDoc.data().downloadCount);
            } else {
                console.log('Document does not exist');
            }
        } catch (error) {
            console.error('Error incrementing or fetching download count: ', error);
        }
    };

    return (
        <Layout>
            <Container>
                <Box borderRadius="lg" bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} p={3} mb={6} align="center">
                    Bonjour et bienvenue chez Centi Cresento ! Participez à nos tombola et gagner de l&apos;argent dès maintenant 💸
                </Box>


                <Box display={{ md: 'flex' }}>
                    <Box flexGrow={1}>
                        <Heading as="h2" variant="page-title">
                            Centi Cresento
                        </Heading>
                        Si vous pouviez revenir à l&apos;époque où le Bitcoin valait 1$, saisiriez-vous votre chance ? Alors, saisissez cette chance maintenant !
                    </Box>
                    <Box
                        flexShrink={0}
                        mt={{ base: 4, md: 0 }}
                        ml={{ md: 6 }}
                        textAlign="center"
                    >
                        <Box
                            borderColor="whiteAlpha.800"
                            borderWidth={2}
                            borderStyle="solid"
                            w="100px"
                            h="100px"
                            display="inline-block"
                            borderRadius="full"
                            overflow="hidden"
                        >
                            <Image
                                src="/images/profil.jpg"
                                alt="Profile image"
                                width="200"
                                height="200"
                            />
                        </Box>
                    </Box>
                </Box>
                <Section delay={0.1}>
                    <Flex align="center">
                        <Heading as="h3" variant="section-title" mr={4}>
                            Android
                        </Heading>
                        <Icon as={FaAndroid} boxSize={8} color="green.500" />
                    </Flex>
                    <Paragraph>
                        Téléchargez notre application
                        <Link as={NextLink} href="" passHref scroll={false}>
                        </Link>
                        . Acceptez les applications de {" "}
                        <Link
                            as={NextLink}
                            href=""
                            passHref
                        >
                            sources inconnues
                        </Link>{" "} dans les paramètres de votre appareil. Déjà{" "}
                        <Link
                            as={NextLink}
                            href=""
                            passHref
                        >
                            {1000 + downloadCount}
                        </Link>{" "}
                        téléchargements!
                    </Paragraph>
                    <Box align="center" my={4}>
                        <Button
                            as="a"
                            href="/android/Centi Cresento.apk"
                            scroll={false}
                            rightIcon={<ChevronRightIcon />}
                            colorScheme="teal"
                            download
                            onClick={handleDownload}
                        >
                            Télécharger
                        </Button>
                    </Box>
                </Section>
                <Section delay={0.2}>
                    <Flex align="center" mb={4}>
                        <Heading as="h3" variant="section-title" mr={4}>
                            IOS
                        </Heading>
                        <Icon as={FaApple} boxSize={8} color="black" />
                    </Flex>
                    <Paragraph>
                        La version iOS de notre application est en cours de {" "}
                        <Link
                            as={NextLink}
                            href=""
                            passHref
                        >
                            développement.
                        </Link>{" "} Notre équipe technique travaille activement à sa sortie.
                    </Paragraph>
                </Section>

                <Section delay={0.2}>
                    <Heading as="h3" variant="section-title" mr={4}>
                        App_experience
                    </Heading>

                </Section>
                <SimpleGrid columns={[1, 1, 2]} gap={6}>
                    <Section>
                        <WorkGridItem id="inkdrop" title="" thumbnail={winner_page}>
                            Results interface
                        </WorkGridItem>
                    </Section>
                </SimpleGrid>
                <Section delay={0.3}>
                    <Heading as="h3" variant="section-title">
                        Our Groups
                    </Heading>
                    <List>
                        <ListItem>
                            <Link href='https://whatsapp.com/channel/0029VaeaFzC4IBhA5iSCOH3m' target='_blank'>
                                <Button variant="ghost" colorScheme='teal' leftIcon={<Icon as={IoLogoWhatsapp} />}>
                                    @whatsapp_centi_cresento
                                </Button>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href='https://t.me/+3BYN_0tdtCAxODRk' target='_blank'>
                                <Button variant="ghost" colorScheme='teal' leftIcon={<Icon as={FaTelegramPlane} />}>
                                    @telegram_centi_cresento
                                </Button>
                            </Link>
                        </ListItem>
                    </List>

                    <Heading as="h3" variant="section-title">
                        Newsletter
                    </Heading>
                    <p>
                        Rejoignez notre communauté pour des mises à jour hebdomadaires sur les nouvelles façons de gagner de l&apos;argent facilement avec nos applications, des conseils exclusifs, et des offres spéciales.                    </p>

                    <Box align="center" my={4}>
                        <Button
                            as={NextLink}
                            href=""
                            scroll={false}  // Correction ici
                            leftIcon={<EmailIcon />}
                            colorScheme="teal"
                        >
                            Inscrivez-vous à notre newsletter ici
                        </Button>
                    </Box>

                </Section>
            </Container>
            <Footer />
        </Layout>
    );
}

export default Page;
