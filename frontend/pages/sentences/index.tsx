import MainLayout from "~/components/layouts/main";

export default function Sentences({user}: any) {
    return (
        <MainLayout user={user}>
            Sentences
        </MainLayout>
    )
}

export const getServerSideProps = () => {
    console.log('testset')
    return {
        props: {
            user: {
                id: 1,
                name: 'Ivan'
            }
        }
    }
}