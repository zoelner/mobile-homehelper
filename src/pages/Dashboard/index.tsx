import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import api from '../../services/api';
import Loader from '../../components/Loader';

import { CategoryList, Category, CategoryText } from './styles';

interface Category {
  id: number;
  name: string;
}

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function getCategories() {
      const response = await api.get('category');

      setCategories(response.data);
    }

    getCategories();
  }, []);

  if (!categories.length) {
    return <Loader />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={136}
      enabled
    >
      {
        <CategoryList
          data={categories}
          keyExtractor={(category: Category) => String(category.id)}
          renderItem={({ item: category }: { item: Category }) => (
            <Category>
              <CategoryText>{category.name}</CategoryText>
            </Category>
          )}
        />
      }
    </KeyboardAvoidingView>
  );
};

export default Dashboard;
