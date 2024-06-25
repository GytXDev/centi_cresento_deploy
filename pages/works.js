import { Container, Heading, SimpleGrid, Divider, Box, Text } from '@chakra-ui/react'
import Section from '../components/section'
import Layout from '../components/layouts/article'
import { WorkGridItem } from '../components/grid-item'

import light_screen from '../public/images/app_experience_light.png'
import dark_screen from '../public/images/app_experience_dark.png'
import tutorial_deposit from '../public/images/video/tutorial_deposit.mp4'
import tutorial_withdraw from '../public/images/video/tutorial_withdraw.mp4'

const Works = () => (
    <Layout title="Works">
        <Container>
            <Heading as="h3" fontSize={20} mb={4}>
                UI/Assistant
            </Heading>

            <SimpleGrid columns={[1, 1, 2]} gap={6}>
                <Section>
                    <WorkGridItem id="inkdrop" title="" thumbnail={light_screen}>
                        White theme interface
                    </WorkGridItem>
                </Section>
                <Section>
                    <WorkGridItem id="walknote" title="" thumbnail={dark_screen}>
                        Dark theme interface
                    </WorkGridItem>
                </Section>
            </SimpleGrid>

            <Section delay={0.4}>
                <Divider my={6} />

                <Heading as="h3" fontSize={20} mb={4}>
                    Tutorial
                </Heading>
            </Section>
            <SimpleGrid columns={[1, 1, 2]} gap={6}>
                <Section delay={0.5}>
                    <Box>
                        <video width="100%" controls>
                            <source src={tutorial_deposit} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <Text mt={2} fontSize="lg" fontWeight="bold">
                            Dépôt Tutoriel
                        </Text>
                    </Box>
                </Section>
                <Section delay={0.5}>
                    <Box>
                        <video width="100%" controls>
                            <source src={tutorial_withdraw} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <Text mt={4} fontSize="lg" fontWeight="bold">
                            Retrait Tutoriel
                        </Text>
                    </Box>
                </Section>
            </SimpleGrid>
        </Container>
    </Layout>
)

export default Works
export { getServerSideProps } from '../components/chakra'
