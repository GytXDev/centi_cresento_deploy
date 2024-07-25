import { Container, Heading, SimpleGrid, Box, Text, Button } from '@chakra-ui/react';
import Layout from '../components/layouts/article';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebaseConfig';
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';

const Bets = () => {
    const [bets, setBets] = useState([]);

    useEffect(() => {
        const fetchBets = async () => {
            try {
                const betsQuery = query(
                    collection(db, 'bets'),
                    orderBy('creationDate', 'desc'),
                    limit(3)
                );
                const betsCollection = await getDocs(betsQuery);
                const betsData = betsCollection.docs.map(doc => ({
                    id: doc.id,
                    description: doc.data().description,
                    potentialGain: doc.data().potentialGain * 616.028,
                    participationSum: doc.data().participationSum * 616.028,
                    creationDate: new Date(doc.data().creationDate),
                    endDate: calculateEndDate(doc.data().creationDate, doc.data().duration),
                    isGainSending: doc.data().isGainSending === true
                }));
                setBets(betsData);
            } catch (error) {
                console.error('Erreur lors de la récupération des paris :', error);
            }
            // Vous n'avez pas besoin de setLoading(false) ici
        };

        fetchBets();
    }, []);

    const calculateEndDate = (creationDateString, duration) => {
        const creationDate = new Date(creationDateString);
        const endDate = new Date(creationDate.getTime() + duration);
        return endDate.toLocaleDateString();
    };

    return (
        <Layout title="Bets">
            <Container>
                <Heading as="h3" fontSize={20} mb={4}>
                    Activité de Tombola
                </Heading>
                <SimpleGrid columns={[1, 1, 2]} gap={6}>
                    {bets.map(bet => (
                        <Box key={bet.id} p={4} borderWidth="1px" borderRadius="lg" position="relative">
                            <Text fontSize="xl" fontWeight="bold" mb={2}>
                                {bet.description}
                            </Text>
                            <Text fontSize="md">Gain: {bet.potentialGain.toFixed(0)} CFA</Text>
                            <Text fontSize="md">Ticket: {bet.participationSum.toFixed(0)} CFA</Text>
                            <Button variant="ghost" colorScheme='teal' >
                                {bet.isGainSending ? 'Terminé' : 'En cours'}
                            </Button>
                            <Text
                                fontSize="sm"
                                position="absolute"
                                bottom="8px"
                                right="8px"
                                color="gray.500"
                            >
                                Date de fin : {bet.endDate}
                            </Text>
                            <Box
                                position="absolute"
                                top="8px"
                                right="8px"
                                width="10px"
                                height="10px"
                                borderRadius="50%"
                                backgroundColor={bet.isGainSending ? 'green.500' : 'orange.500'}
                            />
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Layout>
    );
};

export default Bets;
