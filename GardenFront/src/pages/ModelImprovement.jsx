import AuthenticatedAdminGuard from "../guards/AuthenticatedAdmin";


function ModelImprovement() {
     return <div>
    <div className="text-2xl font-bold text-center">
        This is the Model Improvement page
    </div>
    <div className="text-center">If you reached here, you are an admin (:</div>
</div>
}

export default AuthenticatedAdminGuard(ModelImprovement)