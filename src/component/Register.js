import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseconnect';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // State cho xác nhận mật khẩu
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu và mật khẩu nhập lại có khớp không
    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp. Vui lòng kiểm tra lại.');
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setIsLoading(true);
    try {
      // Tạo người dùng trong Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Lưu thông tin người dùng vào Firestore collection 'users'
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        uid: user.uid,
        createdAt: new Date().toISOString(),
      });

      console.log('Đăng ký thành công và lưu vào Firestore');
      navigate('/login');
    } catch (err) {
      console.error('Lỗi:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email này đã được sử dụng. Vui lòng thử email khác.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Email không hợp lệ. Vui lòng kiểm tra lại.');
      } else if (err.code === 'auth/weak-password') {
        setError('Mật khẩu quá yếu. Vui lòng sử dụng mật khẩu ít nhất 6 ký tự.');
      } else {
        setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Tạo tài khoản mới
          </h2>
          <p className="text-gray-600 mt-2">Tham gia cùng chúng tôi ngay hôm nay!</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">Email</label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-blue-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ff@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Mật khẩu</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Nhập lại mật khẩu</label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Đang xử lý...
              </span>
            ) : (
              'Đăng ký ngay'
            )}
          </button>
        </form>

        <div className="text-center mt-4 text-gray-600">
          <p>
            Đã có tài khoản?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Đăng nhập tại đây
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;