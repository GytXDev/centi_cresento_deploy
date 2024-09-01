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
import { FaAndroid, FaApple, FaTelegramPlane, FaGlobe } from 'react-icons/fa';
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
                    Gagner de l&apos;argent et bien plus encore 💸
                </Box>

                <Box display={{ md: 'flex' }} mb={4}>
                    <Box flexGrow={1}>
                        <Paragraph>
                            Entrez dans le monde du jeu et de l&apos;excitation avec Centi Crescendo ! Laissez-vous emporter par l&apos;adrénaline des tombolas et découvrez la joie de gagner. Participez maintenant et vivez l&apos;expérience palpitante d&apos;une victoire en un clic !
                        </Paragraph>
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
                {/* Section pour rediriger vers la page de jeu */}
                <Section delay={0.2}>
                    <Flex align="center" mb={4}>
                        <Heading as="h3" variant="section-title" mr={4}>
                            Jouez en Ligne
                        </Heading>
                        <Icon as={FaGlobe} boxSize={8} color="teal.500" />
                    </Flex>
                    <Paragraph>
                        Participez à nos tombolas simplement et rapidement en ligne depuis votre Android, iPhone, PC ou Mac. Rejoignez Centi Crescendo et gagnez des prix en quelques clics !
                    </Paragraph>
                    <Box align="center" my={4}>
                        <Button
                            as="a"
                            href="https://centi-crensento.web.app/"
                            scroll={false}
                            rightIcon={<ChevronRightIcon />}
                            colorScheme="teal"
                        >
                            Jouer Maintenant
                        </Button>
                    </Box>
                </Section>


                <Section delay={0.1}>
                    <Flex align="center">
                        <Heading as="h3" variant="section-title" mr={4}>
                            Android
                        </Heading>
                        <Icon as={FaAndroid} boxSize={8} color="green.500" />
                    </Flex>
                    <Paragraph>
                        Téléchargez notre application Android en un clic ! Acceptez les applications de{" "}
                        <Link as={NextLink} href="" passHref>
                            sources inconnues
                        </Link>{" "}
                        dans les paramètres de votre appareil pour commencer. Déjà{" "}
                        <Link as={NextLink} href="" passHref>
                            {700 + downloadCount}
                        </Link>{" "}
                        téléchargements et ça ne fait que commencer !
                    </Paragraph>

                    <Box align="center" my={4}>
                        <Button
                            as="a"
                            href="/android/Centi Crescendo.apk"
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
                                    @whatsapp_centi_crescendo
                                </Button>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href='https://t.me/+3BYN_0tdtCAxODRk' target='_blank'>
                                <Button variant="ghost" colorScheme='teal' leftIcon={<Icon as={FaTelegramPlane} />}>
                                    @telegram_centi_crescendo
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
