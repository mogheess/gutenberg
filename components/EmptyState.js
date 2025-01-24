export const EmptyState = ({ icon: Icon, title, description }) => {
    return (
      <div className="text-center py-12">
        <Icon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    );
  };
  